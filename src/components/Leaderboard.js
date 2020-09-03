import React from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { db, auth } from "../firebase";
import { Card, Avatar } from "@material-ui/core";
export default function Leaderboard() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={open ? "leaderboard-open" : "leaderboard"}>
      <button
        className="open-close"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </button>
      {open ? <RenderLeaderboard></RenderLeaderboard> : <></>}
    </div>
  );
}
function RenderLeaderboard({ open }) {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    db.collection("score")
      .orderBy("score", "desc")
      .limit(7)
      .get()
      .then(function (querySnapshot) {
        let arr = [];
        querySnapshot.forEach(function (doc) {
          arr.push({ id: doc.id, data: doc.data() });
        });
        setData(arr);
      });
  }, []);
  return (
    <div className="lb-content">
      <h2>LEADERBOARD</h2>

      <div className="leader-items">
        {data.map((doc, i) => (
          <Card
            key={doc.id}
            className={
              auth.currentUser.uid === doc.id
                ? "leader-item current"
                : "leader-item"
            }
          >
            <h1>{i + 1}</h1>
            <Avatar alt={doc.data.name} src={doc.data.photo} />
            <div>
              <h3>{doc.data.name}</h3>
              <hr />
              <p>SCORE: {doc.data.score}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
