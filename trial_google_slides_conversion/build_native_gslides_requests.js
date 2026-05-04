const fs = require("fs");
const path = require("path");

const EMU = 914400;
const W = 10 * EMU;
const H = 5.625 * EMU;
const red = { red: 1, green: 0.1059, blue: 0.1059 };
const redDark = { red: 0.72, green: 0.05, blue: 0.08 };
const ink = { red: 0.09, green: 0.12, blue: 0.16 };
const body = { red: 0.22, green: 0.26, blue: 0.3 };
const muted = { red: 0.43, green: 0.47, blue: 0.52 };
const pale = { red: 0.97, green: 0.98, blue: 0.99 };
const white = { red: 1, green: 1, blue: 1 };
const line = { red: 0.88, green: 0.9, blue: 0.93 };

function emu(v) {
  return Math.round(v * EMU);
}

function id(s, n) {
  return `s${String(s).padStart(2, "0")}_${n}`.replace(/[^A-Za-z0-9_]/g, "_").slice(0, 50);
}

function rgb(c) {
  return { solidFill: { color: { rgbColor: c } } };
}

function transform(x, y) {
  return { scaleX: 1, scaleY: 1, translateX: emu(x), translateY: emu(y), unit: "EMU" };
}

function size(w, h) {
  return { width: { magnitude: emu(w), unit: "EMU" }, height: { magnitude: emu(h), unit: "EMU" } };
}

function createShape(requests, page, objectId, shapeType, x, y, w, h) {
  requests.push({
    createShape: {
      objectId,
      shapeType,
      elementProperties: { pageObjectId: page, size: size(w, h), transform: transform(x, y) }
    }
  });
}

function styleShape(requests, objectId, fill, outline = null) {
  requests.push({
    updateShapeProperties: {
      objectId,
      shapeProperties: {
        shapeBackgroundFill: rgb(fill),
        outline: outline ? { outlineFill: rgb(outline), weight: { magnitude: 1, unit: "PT" } } : { propertyState: "NOT_RENDERED" }
      },
      fields: outline ? "shapeBackgroundFill.solidFill.color,outline.outlineFill.solidFill.color,outline.weight" : "shapeBackgroundFill.solidFill.color,outline.propertyState"
    }
  });
}

function text(requests, page, objectId, value, x, y, w, h, opts = {}) {
  createShape(requests, page, objectId, "TEXT_BOX", x, y, w, h);
  requests.push({ insertText: { objectId, insertionIndex: 0, text: value } });
  requests.push({
    updateTextStyle: {
      objectId,
      textRange: { type: "ALL" },
      style: {
        foregroundColor: { opaqueColor: { rgbColor: opts.color || ink } },
        fontSize: { magnitude: opts.size || 18, unit: "PT" },
        bold: Boolean(opts.bold),
        fontFamily: "Arial"
      },
      fields: "foregroundColor,fontSize,bold,fontFamily"
    }
  });
  requests.push({
    updateParagraphStyle: {
      objectId,
      textRange: { type: "ALL" },
      style: { alignment: opts.align || "START", lineSpacing: opts.lineSpacing || 110 },
      fields: "alignment,lineSpacing"
    }
  });
}

function rect(requests, page, objectId, x, y, w, h, fill, outline = null, round = true) {
  createShape(requests, page, objectId, round ? "ROUND_RECTANGLE" : "RECTANGLE", x, y, w, h);
  styleShape(requests, objectId, fill, outline);
}

function sidebar(requests, s, page, chapter, pageNo) {
  rect(requests, page, id(s, "sidebar"), 0, 0, 0.38, 5.625, red, null, false);
  text(requests, page, id(s, "side_chapter"), chapter, 0.03, 0.18, 0.32, 0.2, { size: 7, bold: true, color: white, align: "CENTER" });
  text(requests, page, id(s, "side_page"), String(pageNo), 0.05, 5.05, 0.28, 0.25, { size: 18, bold: true, color: white, align: "CENTER" });
}

function title(requests, s, page, chapter, heading, lead = "") {
  text(requests, page, id(s, "eyebrow"), chapter, 0.78, 0.46, 1.8, 0.22, { size: 12, bold: true, color: redDark });
  text(requests, page, id(s, "title"), heading, 0.78, 0.7, 8.65, 0.45, { size: 29, bold: true, color: ink });
  if (lead) text(requests, page, id(s, "lead"), lead, 0.78, 1.18, 8.65, 0.36, { size: 13, bold: true, color: body });
}

function addCard(requests, s, page, n, x, y, w, h, heading, copy) {
  rect(requests, page, id(s, `card_${n}`), x, y, w, h, white, line);
  createShape(requests, page, id(s, `card_icon_${n}`), "ELLIPSE", x + 0.22, y + 0.25, 0.62, 0.62);
  styleShape(requests, id(s, `card_icon_${n}`), { red: 1, green: 0.92, blue: 0.92 }, null);
  text(requests, page, id(s, `card_icon_text_${n}`), String(n).padStart(2, "0"), x + 0.29, y + 0.42, 0.48, 0.2, { size: 11, bold: true, color: red, align: "CENTER" });
  text(requests, page, id(s, `card_h_${n}`), heading, x + 0.22, y + 1.0, w - 0.44, 0.55, { size: 16, bold: true, color: redDark, align: "CENTER" });
  text(requests, page, id(s, `card_p_${n}`), copy, x + 0.22, y + 1.62, w - 0.44, h - 1.8, { size: 10, bold: true, color: body, align: "CENTER", lineSpacing: 115 });
}

function screenshotBox(requests, s, page, name, x, y, w, h, label) {
  rect(requests, page, id(s, `shot_${name}`), x, y, w, h, white, line);
  text(requests, page, id(s, `shot_label_${name}`), label || "スクリーンショット挿入エリア", x + 0.15, y + h / 2 - 0.12, w - 0.3, 0.24, { size: 13, bold: true, color: muted, align: "CENTER" });
}

function build() {
  const requests = [{ deleteObject: { objectId: "p" } }];
  const slides = Array.from({ length: 12 }, (_, i) => `slide_${String(i + 1).padStart(2, "0")}`);
  slides.forEach((page) => requests.push({ createSlide: { objectId: page, slideLayoutReference: { predefinedLayout: "BLANK" } } }));

  // 1 cover
  rect(requests, slides[0], id(1, "bg"), 0, 0, 10, 5.625, { red: 0.96, green: 0.98, blue: 0.99 }, null, false);
  createShape(requests, slides[0], id(1, "red_arc"), "ELLIPSE", 7.55, -0.55, 3.8, 3.8); styleShape(requests, id(1, "red_arc"), red, null);
  createShape(requests, slides[0], id(1, "red_soft"), "ELLIPSE", -0.75, 4.55, 1.8, 1.8); styleShape(requests, id(1, "red_soft"), { red: 1, green: 0.9, blue: 0.9 }, null);
  text(requests, slides[0], id(1, "recipient"), "株式会社三幸 御中", 0.65, 1.1, 4.0, 0.35, { size: 15, bold: true, color: body });
  text(requests, slides[0], id(1, "main"), "日常業務の効率化と将来的な展望を見据えた\n基幹管理システムのご提案", 0.65, 2.35, 7.3, 0.8, { size: 29, bold: true, color: ink });
  text(requests, slides[0], id(1, "date"), "2026年05月07日", 0.65, 4.05, 2.8, 0.28, { size: 14, bold: true, color: body });
  text(requests, slides[0], id(1, "brand"), "Field X", 4.2, 5.18, 1.6, 0.28, { size: 18, bold: true, color: red, align: "CENTER" });

  // 2 contents
  rect(requests, slides[1], id(2, "bg"), 0, 0, 10, 5.625, pale, null, false); sidebar(requests, 2, slides[1], "Contents", 2);
  title(requests, 2, slides[1], "Contents", "目次");
  [
    ["01", "今回のご提案につきまして", "本提案の全体像についてご説明します"],
    ["02", "デモ画面イメージ", "基幹管理システムの主要機能を画面イメージでご紹介します"],
    ["03", "将来的な展望と\n今後の進め方", "機能拡張の方向性と導入までの進め方をご案内します"]
  ].forEach((a, i) => {
    const x = 0.8 + i * 3.02;
    rect(requests, slides[1], id(2, `agenda_${i}`), x, 1.55, 2.55, 2.9, white, null);
    createShape(requests, slides[1], id(2, `agenda_no_${i}`), "ELLIPSE", x + 0.98, 1.82, 0.6, 0.6); styleShape(requests, id(2, `agenda_no_${i}`), red, null);
    text(requests, slides[1], id(2, `agenda_no_t_${i}`), a[0], x + 1.06, 2.02, 0.45, 0.18, { size: 16, bold: true, color: white, align: "CENTER" });
    rect(requests, slides[1], id(2, `agenda_line_${i}`), x + 0.55, 2.72, 1.45, 0.03, redDark, null, false);
    text(requests, slides[1], id(2, `agenda_h_${i}`), a[1], x + 0.25, 2.95, 2.05, 0.55, { size: 16, bold: true, color: ink, align: "CENTER" });
    text(requests, slides[1], id(2, `agenda_p_${i}`), a[2], x + 0.25, 3.72, 2.05, 0.55, { size: 11, bold: true, color: body, align: "CENTER" });
  });

  // dividers
  [[3, "Chapter1", 3, "01", "今回のご提案につきまして"], [5, "Chapter2", 5, "02", "デモ画面イメージ"], [9, "Chapter3", 9, "03", "将来的な展望と今後の進め方"]].forEach(([s, ch, pn, no, h]) => {
    const page = slides[s - 1];
    rect(requests, page, id(s, "bg"), 0, 0, 10, 5.625, pale, null, false); sidebar(requests, s, page, ch, pn);
    text(requests, page, id(s, "no"), no, 0.95, 1.72, 1.2, 0.8, { size: 56, bold: true, color: red });
    text(requests, page, id(s, "heading"), h, 0.95, 2.62, 7.8, 0.55, { size: 31, bold: true, color: ink });
    rect(requests, page, id(s, "rule"), 0.95, 3.38, 5.2, 0.035, red, null, false);
  });

  // 4 proposal
  rect(requests, slides[3], id(4, "bg"), 0, 0, 10, 5.625, pale, null, false); sidebar(requests, 4, slides[3], "Chapter1", 4);
  title(requests, 4, slides[3], "Chapter1", "今回のご提案内容");
  rect(requests, slides[3], id(4, "msg"), 0.78, 1.32, 8.65, 0.45, red, null);
  text(requests, slides[3], id(4, "msg_text"), "基幹業務を効率化し、現場の負荷を下げ、今後につながるシステム基盤を構築します。", 1.0, 1.45, 8.2, 0.18, { size: 14, bold: true, color: white, align: "CENTER" });
  [
    ["基本機能を\n一つの基盤に整理", "物件管理、入居者管理、契約情報、反響取り込み、自社物件の出稿等を集約します"],
    ["修繕対応・契約書作成\n業務の効率化", "退去情報・契約情報を含めたオペレーションを標準化し、業務内容を効率化します"],
    ["現場利用しやすい\nUIとスマホ対応", "直感的な画面設計とスマホ対応により、外出先でも快適な利用が可能です"],
    ["他社物件の出稿機能・\nAI活用への拡張性", "他社物件の出稿機能を備え、AIによる自動化など将来的な拡張にも対応します"]
  ].forEach((c, i) => addCard(requests, 4, slides[3], i + 1, 0.78 + i * 2.18, 2.02, 1.9, 2.2, c[0], c[1]));
  rect(requests, slides[3], id(4, "bottom"), 1.0, 4.55, 8.15, 0.5, { red: 1, green: 0.94, blue: 0.94 }, red);
  text(requests, slides[3], id(4, "bottom_text"), "基本的な機能に加え、現業務の効率化、現場での使いやすさを最重要視。\n今後のAI拡張まで見据えた業務基盤を整備します。", 1.25, 4.66, 7.65, 0.25, { size: 12, bold: true, color: redDark, align: "CENTER" });

  // 6 demo property
  rect(requests, slides[5], id(6, "bg"), 0, 0, 10, 5.625, pale, null, false); sidebar(requests, 6, slides[5], "Chapter2", 6);
  title(requests, 6, slides[5], "Chapter2", "物件・入居者管理画面", "物件・入居者・修繕状況などをひとつの画面で確認できます");
  screenshotBox(requests, 6, slides[5], "property", 0.78, 1.55, 6.0, 3.35, "スクリーンショット挿入エリア / 物件・入居者管理");
  [["物件情報の確認", "物件情報、空室状況、契約状況を確認"], ["入居者情報の確認", "入居者情報や契約内容、請求情報等を確認"], ["修繕・対応履歴の確認", "対応漏れを防ぎ、過去履歴も参照"]].forEach((c, i) => {
    rect(requests, slides[5], id(6, `call_${i}`), 7.05, 1.55 + i * 1.13, 2.35, 0.9, white, line);
    text(requests, slides[5], id(6, `call_h_${i}`), c[0], 7.28, 1.72 + i * 1.13, 1.9, 0.22, { size: 14, bold: true, color: redDark });
    text(requests, slides[5], id(6, `call_p_${i}`), c[1], 7.28, 2.02 + i * 1.13, 1.9, 0.25, { size: 10, bold: true, color: body });
  });
  text(requests, slides[5], id(6, "note"), "※ 画面イメージは開発中のものであり、実際の仕様とは異なる場合があります。", 5.05, 5.05, 4.3, 0.18, { size: 8, bold: true, color: muted, align: "END" });

  // 7 demo mobile
  rect(requests, slides[6], id(7, "bg"), 0, 0, 10, 5.625, pale, null, false); sidebar(requests, 7, slides[6], "Chapter2", 7);
  title(requests, 7, slides[6], "Chapter2", "スマートフォン対応・各種契約書作成機能", "スマートフォン対応機能を実装し、日常業務の負荷を軽減します");
  screenshotBox(requests, 7, slides[6], "contract", 0.78, 1.55, 4.65, 3.35, "スクリーンショット挿入エリア / 契約・請求");
  screenshotBox(requests, 7, slides[6], "mobile", 5.62, 1.55, 1.25, 3.35, "スマホ");
  [["契約書等作成機能", "契約書・更新書などを作成・出力"], ["請求・明細の管理", "請求書や明細に関する情報を一元管理"], ["スマホ対応", "外出先でも各種情報の閲覧が可能"]].forEach((c, i) => {
    rect(requests, slides[6], id(7, `call_${i}`), 7.08, 1.55 + i * 1.13, 2.3, 0.9, white, line);
    text(requests, slides[6], id(7, `call_h_${i}`), c[0], 7.28, 1.72 + i * 1.13, 1.85, 0.22, { size: 13, bold: true, color: redDark });
    text(requests, slides[6], id(7, `call_p_${i}`), c[1], 7.28, 2.02 + i * 1.13, 1.85, 0.25, { size: 9, bold: true, color: body });
  });

  // 8 demo grid
  rect(requests, slides[7], id(8, "bg"), 0, 0, 10, 5.625, pale, null, false); sidebar(requests, 8, slides[7], "Chapter2", 8);
  title(requests, 8, slides[7], "Chapter2", "物件出稿・反響取り込み・AIによる自動化、省力化", "自社物件に加え他社物件のHP、各ポータルへの出稿から反響対応、今後のAI活用による業務効率化も。");
  [["publishOwn", "自社物件の出稿機能"], ["publishOther", "他社物件の出稿機能"], ["responseMail", "反響取り込み・メール返信効率化"], ["aiAssist", "AIによる返信文作成・日程調整・検索"]].forEach((c, i) => {
    const x = 0.8 + (i % 2) * 4.35, y = 1.62 + Math.floor(i / 2) * 1.75;
    text(requests, slides[7], id(8, `grid_h_${i}`), c[1], x, y, 3.85, 0.23, { size: 13, bold: true, color: ink });
    screenshotBox(requests, 8, slides[7], c[0], x, y + 0.32, 3.75, 1.15, "スクリーンショット挿入エリア");
  });

  // 10 AI
  rect(requests, slides[9], id(10, "bg"), 0, 0, 10, 5.625, pale, null, false); sidebar(requests, 10, slides[9], "Chapter3", 10);
  title(requests, 10, slides[9], "Chapter3", "弊社による今後のAI活用イメージ", "反響対応の自動化・社内データ検索・営業支援・書類自動化などの活用が見込まれます");
  createShape(requests, slides[9], id(10, "hub"), "ELLIPSE", 4.15, 2.24, 1.35, 1.35); styleShape(requests, id(10, "hub"), red, null);
  text(requests, slides[9], id(10, "hub_text"), "基幹\nデータ", 4.45, 2.62, 0.75, 0.42, { size: 14, bold: true, color: white, align: "CENTER" });
  [["反響対応のAI支援", "入居者問い合わせ対応を自動化", 0.9, 1.6], ["営業支援への展開", "訪問時の必要情報を整理", 0.9, 3.42], ["社内データ横断検索", "物件・顧客・契約・履歴を横断検索", 6.25, 1.6], ["AIによる書類活用", "契約書・請求書等を検索・要約・作成", 6.25, 3.42]].forEach((c, i) => {
    rect(requests, slides[9], id(10, `ai_card_${i}`), c[2], c[3], 2.65, 0.78, white, line);
    text(requests, slides[9], id(10, `ai_h_${i}`), c[0], c[2] + 0.18, c[3] + 0.14, 2.25, 0.2, { size: 13, bold: true, color: redDark });
    text(requests, slides[9], id(10, `ai_p_${i}`), c[1], c[2] + 0.18, c[3] + 0.43, 2.25, 0.2, { size: 9, bold: true, color: body });
  });
  rect(requests, slides[9], id(10, "ai_bottom"), 1.0, 4.75, 8.0, 0.45, { red: 1, green: 0.94, blue: 0.94 }, red);
  text(requests, slides[9], id(10, "ai_bottom_text"), "基幹データを中心としたAI活用で、売り上げ・顧客満足度・業務全体の生産性向上を支援します。", 1.25, 4.9, 7.5, 0.16, { size: 11, bold: true, color: redDark, align: "CENTER" });

  // 11 roadmap
  rect(requests, slides[10], id(11, "bg"), 0, 0, 10, 5.625, pale, null, false); sidebar(requests, 11, slides[10], "Chapter3", 11);
  title(requests, 11, slides[10], "Chapter3", "今後の進め方", "現場への影響を抑えながら、下記の流れで進めさせていただければ幸いです");
  ["ご契約", "進め方の確認", "データ移行先の準備", "システム開発", "現場導入", "改善"].forEach((h, i) => {
    const x = 0.75 + i * 1.45;
    createShape(requests, slides[10], id(11, `ring_${i}`), "ELLIPSE", x, 1.85, 0.72, 0.72); styleShape(requests, id(11, `ring_${i}`), white, red);
    text(requests, slides[10], id(11, `ring_t_${i}`), String(i + 1).padStart(2, "0"), x + 0.13, 2.1, 0.46, 0.17, { size: 13, bold: true, color: red, align: "CENTER" });
    text(requests, slides[10], id(11, `road_h_${i}`), h, x - 0.18, 2.78, 1.08, 0.28, { size: 12, bold: true, color: redDark, align: "CENTER" });
    text(requests, slides[10], id(11, `road_p_${i}`), ["契約締結", "詳細プラン\nすり合わせ", "移行先環境を\n準備", "開発と週次\n報告", "テスト後に\n本格導入", "改善を継続"][i], x - 0.25, 3.25, 1.2, 0.55, { size: 9, bold: true, color: body, align: "CENTER" });
  });

  // 12 subsidy
  rect(requests, slides[11], id(12, "bg"), 0, 0, 10, 5.625, pale, null, false); sidebar(requests, 12, slides[11], "Chapter3", 12);
  title(requests, 12, slides[11], "Chapter3", "弊社AI導入による補助金活用支援について", "本システム導入にあたり、下記の補助金の活用が可能です");
  [["中小企業省力化\n投資補助金（一般型）の\n活用可能性", "弊社AIを用いたシステムの導入は、業務効率化や生産性向上に資する取り組みとして対象となる可能性があります。\n\n条件次第で最大 6,500万円 の補助を受けられる可能性あり"], ["申請可否の確認や\n資料整理のサポート", "補助金の申請に必要な要件確認や申請書類の整理・作成について、当社にてサポートいたします。\n\n対象要件の確認 / 必要資料の整理・作成支援 / 申請スケジュールのご相談"]].forEach((c, i) => {
    const x = 0.9 + i * 4.25;
    rect(requests, slides[11], id(12, `sub_${i}`), x, 1.6, 3.75, 2.95, white, line);
    text(requests, slides[11], id(12, `sub_h_${i}`), c[0], x + 0.35, 1.95, 3.05, 0.75, { size: 18, bold: true, color: redDark, align: "CENTER" });
    rect(requests, slides[11], id(12, `sub_rule_${i}`), x + 0.45, 2.85, 2.85, 0.03, red, null, false);
    text(requests, slides[11], id(12, `sub_p_${i}`), c[1], x + 0.35, 3.08, 3.05, 1.0, { size: 11, bold: true, color: body, align: "CENTER" });
  });
  text(requests, slides[11], id(12, "note"), "補助金の採択を保証するものではありません。最新の制度内容や詳細については、公式サイト等でご確認ください。", 0.95, 5.05, 8.45, 0.18, { size: 8, bold: true, color: muted, align: "CENTER" });

  return requests;
}

const out = path.join(__dirname, "native_gslides_requests.json");
fs.writeFileSync(out, JSON.stringify(build(), null, 2));
console.log(out);
