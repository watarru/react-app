import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router";

export default function DiaryList() {
  const [diaries, setDiaries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const storedDiaries = JSON.parse(localStorage.getItem("diaries")) || [];
    setDiaries(storedDiaries);
  }, []);

  // 選択した日付を YYYY-MM-DD に変換（ローカルタイム基準）
  const formatDate = (date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\//g, "-");
  };

  const formattedDate = formatDate(selectedDate);
  const selectedDiary = diaries.find((diary) => diary.date === formattedDate);

  // 日記を保存する（新規追加・編集）
  const handleSave = () => {
    let updatedDiaries;
    if (selectedDiary) {
      // 既存の日記を更新
      updatedDiaries = diaries.map((diary) =>
        diary.date === formattedDate ? { ...diary, title, content } : diary
      );
    } else {
      // 新しい日記を追加
      updatedDiaries = [...diaries, { id: Date.now(), date: formattedDate, title, content }];
    }

    setDiaries(updatedDiaries);
    localStorage.setItem("diaries", JSON.stringify(updatedDiaries));
  };

  // 日記を削除する
  const handleDelete = () => {
    const updatedDiaries = diaries.filter((diary) => diary.date !== formattedDate);
    setDiaries(updatedDiaries);
    localStorage.setItem("diaries", JSON.stringify(updatedDiaries));
    setTitle("");
    setContent("");
  };

  // 日記データがある場合、フォームに既存の値をセット
  useEffect(() => {
    if (selectedDiary) {
      setTitle(selectedDiary.title);
      setContent(selectedDiary.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedDiary]);

  // カレンダーの日付にマークをつける
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      if (diaries.some((diary) => diary.date === dateStr)) {
        return <span style={{ color: "red", fontSize: "20px" }}>●</span>;
      }
    }
    return null;
  };

  return (
    <div>
      <h1>私の日記</h1>
      <Calendar onChange={setSelectedDate} value={selectedDate} tileContent={tileContent} />
      <h2>{formattedDate} の記録</h2>

      <div className={"diary"}>
        <label style={{ textAlign: "left" }}>タイトル:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className={"diary"}>
        <label style={{ textAlign: "left" }}>内容:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <button onClick={handleSave}>{selectedDiary ? "更新" : "追加"}</button>
      {selectedDiary && <button onClick={handleDelete}>削除</button>}
      <button><Link to="/">ログアウト</Link></button>
    </div>
  );
}