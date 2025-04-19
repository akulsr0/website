import { Activity } from "gh-recent-activity";

const RecentActivity = ({
  activity,
  show,
}: {
  activity: Activity[];
  show: boolean;
}) => {
  if (!show) return null;
  return (
    <>
      <br />
      <h3>Recent Activity</h3>
      <ul className="recent-activity-list">
        {activity?.map((act, idx) => (
          <li key={`${act.type}-${idx}`}>{act.text}</li>
        ))}
      </ul>
    </>
  );
};

export default RecentActivity;
