import { Link } from "react-router";

export default function Home() {
    return (
        <>
        <h1>日記アプリへようこそ</h1>
        <nav>
          <Link to="/diary">日記一覧を見る</Link>
          <br />
          <Link to="/new">新しい日記を書く</Link>
        </nav>
        </>
    )
}