# Component Image Generation

## Purpose

image生成をスライド全体ではなく、装飾・図・UIフレームなどの部品単位で行う。
画像生成はコストがかかるため、実行は手動承認後に限定する。
現存assetsは正解扱いしない。生成を依頼する段階で、スマホ、書類、建物など複数スライドで兼用できるモチーフを洗い出し、同じ意味のイラストを別枠で何度も生成させない。

## Inputs

- `design/component_layout_spec.md`
- `design/component_manifest.json`
- 参考画像

## Outputs

- `design/component_prompt_map.md`
- `design/component_asset_plan.md`
- 生成した各部品の保存先メモ

## Procedure

1. 画像生成対象を装飾、図解、UIフレーム、背景ニュアンスに限定する。
2. 各部品ごとに役割、サイズ、透明背景要否、禁止事項を定義する。
3. テキスト入り画像を避ける。
4. 生成依頼前に、複数スライドで兼用できる共通モチーフを洗い出す。
5. 兼用できるモチーフは、1つの生成枠で共通アセットとして作る前提にする。
6. 生成が必要な場合は、プロンプトと用途だけを `design/component_prompt_map.md` に起こし、生成実行は手動承認後に行う。
7. 1部品ずつ生成し、命名規則に沿って保存する。
8. HTMLで重ねる前提で、部品の境界が自然か確認する。

## Reuse Candidates

- smartphone / mobile UI icon
- document / contract / invoice icon
- building / property icon
- database / core system icon
- search / AI assist icon
- roadmap step icons

同じ意味のイラストをページごとに作り直さない。生成時点で共通アセットとして設計し、色、線幅、余白、サイズをCSSや配置側で調整して使い回す。

## Quality Checks

- 画像部品に本文テキストが入っていないか
- 透明背景や矩形切り出し前提が明確か
- 同じカードやフレームを複数回使い回せるか
- スマホ、書類、建物などの共通モチーフを別枠で無駄に生成する計画になっていないか
- スライド全体の一発生成に戻っていないか

## Failure Cases

- 全ページをそのまま画像生成してしまう
- 画像内に見出しや本文まで焼き込んでしまう
- 部品サイズがHTML配置に合っていない
- 似た意味のイラストを毎回別生成する計画にして、資料全体の統一感とコストを悪化させる

## Notes

- image生成は「完成物生成」ではなく「部品生成」に使う。
- 生成プロンプト作成と生成実行は分ける。プロンプト化は通常工程、生成実行は手動工程。
