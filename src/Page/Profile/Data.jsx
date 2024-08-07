export const selectBox = [
  { label: "情報総合学科", value: "情報総合学科" },
  { label: "情報システム科", value: "情報システム科" },
  { label: "情報処理学科", value: "情報処理学科" },
  {
    label: "AIイノベーション学科 AIシステムコース",
    value: "AIイノベーション学科 AIシステムコース",
  },
  {
    label: "AIイノベーション学科 グローバルコミュニケーションコース",
    value: "AIイノベーション学科 グローバルコミュニケーションコース",
  },
  { label: "高度情報学科", value: "高度情報学科" },
  {
    label: "ゲーム総合学科 ゲームプログラミングコース",
    value: "ゲーム総合学科 ゲームプログラミングコース",
  },
  {
    label: "ゲーム総合学科 ゲームCGコース",
    value: "ゲーム総合学科 ゲームCGコース",
  },
  { label: "ゲームサイエンス学科", value: "ゲームサイエンス学科" },
  { label: "ゲームCG学科", value: "ゲームCG学科" },
  {
    label: "ゲーム研究科 ゲームプログラミングコース",
    value: "ゲーム研究科 ゲームプログラミングコース",
  },
  {
    label: "ゲーム研究科 ゲームCGコース",
    value: "ゲーム研究科 ゲームCGコース",
  },
  { label: "映像メディア科", value: "映像メディア科" },
  { label: "映像音響科 映像コース", value: "映像音響科 映像コース" },
  {
    label: "映像音響科 音響・照明コース",
    value: "映像音響科 音響・照明コース",
  },
  { label: "映像メディア研究科", value: "映像メディア研究科" },
  { label: "電気工学科", value: "電気工学科" },
  { label: "電業技術学科", value: "電業技術学科" },
  { label: "電気工学研究科", value: "電気工学研究科" },
  { label: "電子情報学科", value: "電子情報学科" },
  { label: "電子情報研究科", value: "電子情報研究科" },
  { label: "機械工学科", value: "機械工学科" },
  { label: "機械CAD設計科", value: "機械CAD設計科" },
  { label: "産業技術研究科", value: "産業技術研究科" },
];

export const years = [
  { label: "2000", value: "2000" },
  { label: "2001", value: "2001" },
  { label: "2002", value: "2002" },
  { label: "2003", value: "2003" },
  { label: "2004", value: "2004" },
  { label: "2005", value: "2005" },
  { label: "2006", value: "2006" },
  { label: "2007", value: "2007" },
  { label: "2008", value: "2008" },
  { label: "2009", value: "2009" },
  { label: "2010", value: "2010" },
  { label: "2011", value: "2011" },
  { label: "2012", value: "2012" },
  { label: "2013", value: "2013" },
  { label: "2014", value: "2014" },
  { label: "2015", value: "2015" },
  { label: "2016", value: "2016" },
  { label: "2017", value: "2017" },
  { label: "2018", value: "2018" },
  { label: "2019", value: "2019" },
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
  { label: "2030", value: "2030" },
  { label: "2031", value: "2031" },
  { label: "2032", value: "2032" },
  { label: "2033", value: "2033" },
  { label: "2034", value: "2034" },
  { label: "2035", value: "2035" },
  { label: "2036", value: "2036" },
  { label: "2037", value: "2037" },
  { label: "2038", value: "2038" },
  { label: "2039", value: "2039" },
  { label: "2040", value: "2040" },
  { label: "2041", value: "2041" },
  { label: "2042", value: "2042" },
  { label: "2043", value: "2043" },
  { label: "2044", value: "2044" },
  { label: "2045", value: "2045" },
  { label: "2046", value: "2046" },
  { label: "2047", value: "2047" },
  { label: "2048", value: "2048" },
  { label: "2049", value: "2049" },
  { label: "2050", value: "2050" },
];

export const months = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

export const days2 = [];
const startDays = 1;
const endDays = 31;

for (let day = startDays; day <= endDays; day++) {
  days2.push({ label: day.toString(), value: day.toString() });
}

export const days = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "13", value: "13" },
  { label: "14", value: "14" },
  { label: "15", value: "15" },
  { label: "16", value: "16" },
  { label: "17", value: "17" },
  { label: "18", value: "18" },
  { label: "19", value: "19" },
  { label: "20", value: "20" },
  { label: "21", value: "21" },
  { label: "22", value: "22" },
  { label: "23", value: "23" },
  { label: "24", value: "24" },
  { label: "25", value: "25" },
  { label: "26", value: "26" },
  { label: "27", value: "27" },
  { label: "28", value: "28" },
  { label: "29", value: "29" },
  { label: "30", value: "30" },
  { label: "31", value: "31" },
];

export const HOME = [
  { label: "北海道", value: "北海道" },
  { label: "青森県", value: "青森県" },
  { label: "岩手県", value: "岩手県" },
  { label: "宮城県", value: "宮城県" },
  { label: "秋田県", value: "秋田県" },
  { label: "山形県", value: "山形県" },
  { label: "福島県", value: "福島県" },
  { label: "茨城県", value: "茨城県" },
  { label: "栃木県", value: "栃木県" },
  { label: "群馬県", value: "群馬県" },
  { label: "埼玉県", value: "埼玉県" },
  { label: "千葉県", value: "千葉県" },
  { label: "東京都", value: "東京都" },
  { label: "神奈川県", value: "神奈川県" },
  { label: "新潟県", value: "新潟県" },
  { label: "富山県", value: "富山県" },
  { label: "石川県", value: "石川県" },
  { label: "福井県", value: "福井県" },
  { label: "山梨県", value: "山梨県" },
  { label: "長野県", value: "長野県" },
  { label: "岐阜県", value: "岐阜県" },
  { label: "静岡県", value: "静岡県" },
  { label: "愛知県", value: "愛知県" },
  { label: "三重県", value: "三重県" },
  { label: "滋賀県", value: "滋賀県" },
  { label: "京都府", value: "京都府" },
  { label: "大阪府", value: "大阪府" },
  { label: "兵庫県", value: "兵庫県" },
  { label: "奈良県", value: "奈良県" },
  { label: "和歌山県", value: "和歌山県" },
  { label: "鳥取県", value: "鳥取県" },
  { label: "島根県", value: "島根県" },
  { label: "岡山県", value: "岡山県" },
  { label: "広島県", value: "広島県" },
  { label: "山口県", value: "山口県" },
  { label: "徳島県", value: "徳島県" },
  { label: "香川県", value: "香川県" },
  { label: "愛媛県", value: "愛媛県" },
  { label: "高知県", value: "高知県" },
  { label: "福岡県", value: "福岡県" },
  { label: "佐賀県", value: "佐賀県" },
  { label: "長崎県", value: "長崎県" },
  { label: "熊本県", value: "熊本県" },
  { label: "大分県", value: "大分県" },
  { label: "宮崎県", value: "宮崎県" },
  { label: "鹿児島県", value: "鹿児島県" },
  { label: "沖縄県", value: "沖縄県" },
];

export const Bye = [
  { label: "25卒", value: "25卒" },
  { label: "26卒", value: "26卒" },
  { label: "27卒", value: "27卒" },
  { label: "28卒", value: "28卒" },
  { label: "29卒", value: "29卒" },
  { label: "30卒", value: "30卒" },
  { label: "31卒", value: "31卒" },
  { label: "32卒", value: "32卒" },
];

export const options = [
  { title: "特になし", id: 0 },
  { title: "ITパスポート", id: 1 },
  { title: "情報セキュリティマネジメント", id: 2 },
  { title: "基本情報技術者", id: 3 },
  { title: "応用情報技術者", id: 4 },
  { title: "ITストラテジスト", id: 5 },
  { title: "システムアーキテクト", id: 6 },
  { title: "プロジェクトマネージャ", id: 7 },
  { title: "ネットワークスペシャリスト", id: 8 },
  { title: "データベーススペシャリスト", id: 9 },
  { title: "エンベデッドシステムスペシャリスト", id: 10 },
  { title: "ITサービスマネージャ", id: 11 },
  { title: "システム監査技術者", id: 12 },
  { title: "情報処理安全確保支援士", id: 13 },
];

export const older = [];
const startYear = 1800;
const endYear = 2025;

for (let year = startYear; year <= endYear; year++) {
  older.push({ label: year.toString(), value: year.toString() });
}

export const older2 = [];
const startYear2 = 1950;
const endYear2 = 2025;

for (let year = startYear2; year <= endYear2; year++) {
  older2.push({ label: year.toString(), value: year.toString() });
}
