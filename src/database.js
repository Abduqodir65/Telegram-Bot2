// database.js
const videos = [
    { title: "1-dars: JavaScriptga kirish", url: "https://example.com/video1" },
    { title: "2-dars: HTML asoslari", url: "https://example.com/video2" },
    { title: "3-dars: CSS asoslari", url: "https://example.com/video3" },
    { title: "4-dars: DOM manipulyatsiyasi", url: "https://example.com/video4" },
    { title: "5-dars: JavaScript funktsiyalari", url: "https://example.com/video5" },
    { title: "6-dars: Asosiy algoritmlar", url: "https://example.com/video6" },
    { title: "7-dars: Ajax va API", url: "https://example.com/video7" },
    { title: "8-dars: Git va GitHub", url: "https://example.com/video8" },
    { title: "9-dars: React ga kirish", url: "https://example.com/video9" },
    { title: "10-dars: Node.js asoslari", url: "https://example.com/video10" }
];

const getVideos = () => {
    return videos;
};

module.exports = { getVideos };
