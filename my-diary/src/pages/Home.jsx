import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Home() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // パスワード表示・非表示の状態
  const navigate = useNavigate();

  useEffect(() => {
    // ローカルストレージに保存されたパスワードを取得
    const storedPassword = localStorage.getItem("diaryPassword");
    setSavedPassword(storedPassword);
  }, []);

  const handleSetPassword = () => {
    if (password.length < 4) {
      setError("パスワードは4文字以上にしてください。");
      return;
    }
    localStorage.setItem("diaryPassword", password);
    setSavedPassword(password);
    setError("");
  };

  const handleLogin = () => {
    if (password === savedPassword) {
      navigate("/diary");
    } else {
      setError("パスワードが違います。");
    }
  };

  return (
    <div>
      <h1>日記アプリ</h1>
      {savedPassword ? (
        // 既にパスワードが設定されている場合はログインフォームを表示
        <div>
          <p>パスワードを入力してください。</p>
          <div style={{ margin: "30px"}}>
            <input
              style={{ width: "200px"}}
              type={showPassword ? "text" : "password"} // 表示・非表示を切り替え
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={"show"} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "非表示" : "表示"}
            </button>
          </div>
          <button className={"logIn"} onClick={handleLogin}>ログイン</button>
        </div>
      ) : (
        // 初回アクセス時はパスワード設定画面を表示
        <div>
          <p>最初にあなただけのパスワードを設定してください。<br></br><strong>この操作は取り消せません。設定したパスワードを忘れないでください。</strong></p>
          <div style={{ margin: "30px"}}>
            <input
              style={{ width: "200px"}}
              type={showPassword ? "text" : "password"} // 表示・非表示を切り替え
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "非表示" : "表示"}
            </button>
          </div>
          <button className={"logIn"} onClick={handleSetPassword}>設定</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Home;
