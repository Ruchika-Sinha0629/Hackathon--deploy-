"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import "/src/app/styles/rewards.css";

export default function RewardsPage() {

  const { data: session } = useSession();

  const [data, setData] = useState(null);
  const [rewards] = useState([
    { name: "Premium Workout Plan", cost: 500 },
    { name: "30% Discount on Fitness Gear", cost: 1000 },
  ]);

  useEffect(() => {
  if (session?.user?.id) {
    axios
      .get(`/api/progress/?userId=${session.user.id}`)
      .then((res) => setData(res.data));
  }
}, [session]);

  const redeemReward = async (reward) => {
    axios.post("/api/fitness/gamification", { redeemReward: reward }).then(res => setData(res.data));
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Rewards & Badges</h1>

      <h2>Points Earned: {data.points}</h2>

      <h3>Unlocked Badges</h3>
      <div className="badge-container">
        {data.achievements.includes("Gold Badge") && <span className="badge gold">🏅 Gold Badge</span>}
        {data.achievements.includes("Silver Badge") && <span className="badge silver">🥈 Silver Badge</span>}
        {data.achievements.includes("Diamond Badge") && <span className="badge diamond">💎 Diamond Badge</span>}
      </div>

      <h3>Redeem Rewards</h3>
      <ul className="reward-list">
        {rewards.map((reward) => (
          <li key={reward.name}>
            {reward.name} - {reward.cost} pts
            {data.points >= reward.cost && (
              <button className="redeem-btn" onClick={() => redeemReward(reward)}>Redeem</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}