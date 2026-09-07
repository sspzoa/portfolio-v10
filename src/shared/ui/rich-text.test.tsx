import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { RichText } from "./rich-text";

describe("Notion rich text presentation", () => {
  test("renders linked bold text in both nesting orders", () => {
    const html = renderToStaticMarkup(
      <RichText>{"[**프로젝트**](https://example.com)\n\n**[구현 내용](https://example.com/source)**"}</RichText>,
    );

    expect(html).toContain('<a href="https://example.com/"><strong>프로젝트</strong></a>');
    expect(html).toContain('<strong><a href="https://example.com/source">구현 내용</a></strong>');
    expect(html).not.toContain("**");
  });

  test("preserves balanced parentheses in link destinations", () => {
    const html = renderToStaticMarkup(
      <RichText>{"[문서](https://example.com/docs/Architecture_(overview))"}</RichText>,
    );

    expect(html).toContain('<a href="https://example.com/docs/Architecture_(overview)">문서</a>');
    expect(html).not.toContain("</a>)");
  });

  test("normalizes line endings and Unicode bullets while preserving multiline paragraphs", () => {
    const html = renderToStaticMarkup(
      <RichText>{"첫 번째 줄\r\n두 번째 줄\r\n\r\n• 첫째\r\n• 둘째\r\n\r\n설명"}</RichText>,
    );

    expect(html).toContain("<p>첫 번째 줄\n두 번째 줄</p>");
    expect(html).toMatch(/<ul>\s*<li>첫째<\/li>\s*<li>둘째<\/li>\s*<\/ul>\s*<p>설명<\/p>/);
    expect(html).not.toContain("\r");
    expect(html).not.toContain("•");
  });

  test("keeps nested lists and standard hard line breaks in server HTML", () => {
    const html = renderToStaticMarkup(<RichText>{"첫 줄  \n다음 줄\n\n- 주요 작업\n  - 세부 작업"}</RichText>);

    expect(html).toContain("첫 줄<br/>\n다음 줄");
    expect(html).toMatch(/<li>주요 작업\s*<ul>\s*<li>세부 작업<\/li>\s*<\/ul>\s*<\/li>/);
  });

  test("keeps untrusted raw HTML as escaped text", () => {
    const html = renderToStaticMarkup(
      <RichText>{'<script>run()</script>\n\n<img src="https://example.com/tracker" onerror="run()">'}</RichText>,
    );

    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;img");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
  });

  test.each([
    "javascript:alert(1)",
    "javascript&#58;alert(1)",
    "java&#x09;script:alert(1)",
    "data:text/html,test",
    "vbscript:run",
    "file:///etc/passwd",
    "ftp://example.com/file",
    "irc://example.com/channel",
    "//example.com/relative",
    "/relative",
  ])("renders a blocked %s link as its formatted label", (url) => {
    const html = renderToStaticMarkup(<RichText>{`[**링크 이름**](${url})`}</RichText>);

    expect(html).toContain("<strong>링크 이름</strong>");
    expect(html).not.toContain("<a");
    expect(html).not.toContain("href=");
  });

  test("allows and normalizes HTTP, HTTPS, and mailto links", () => {
    const html = renderToStaticMarkup(
      <RichText>{"[웹](HTTPS://EXAMPLE.COM) [개발](http://localhost:3010) [메일](mailto:hello@example.com)"}</RichText>,
    );

    expect(html).toContain('href="https://example.com/"');
    expect(html).toContain('href="http://localhost:3010/"');
    expect(html).toContain('href="mailto:hello@example.com"');
  });

  test("renders Markdown image alt text without an image or resource preload", () => {
    const html = renderToStaticMarkup(
      <RichText>{"![프로젝트 이미지](https://example.com/tracker.png) ![첨부](data:image/svg+xml,test)"}</RichText>,
    );

    expect(html).toContain("프로젝트 이미지");
    expect(html).toContain("첨부");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<link");
    expect(html).not.toContain("tracker.png");
    expect(html).not.toContain("data:");
  });

  test("renders CMS headings as separate paragraphs without changing page hierarchy", () => {
    const html = renderToStaticMarkup(<RichText>{"# 제목\n\n## 소제목\n\n###### 참고"}</RichText>);

    expect(html).toContain("<p>제목</p>");
    expect(html).toContain("<p>소제목</p>");
    expect(html).toContain("<p>참고</p>");
    expect(html).not.toMatch(/<h[1-6]/);
  });
});
