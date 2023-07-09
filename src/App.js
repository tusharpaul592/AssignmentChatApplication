import CommentWidget from "./CommentWidget";
import "./CommentWidget.css";
function App() {
  return (
    <div className="App">
      <h1>My Comment Widget</h1>
      <CommentWidget currentUser={{ id: "user1", role: "admin" }} />
    </div>
  );
}

export default App;
