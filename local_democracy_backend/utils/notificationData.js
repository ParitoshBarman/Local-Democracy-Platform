const sampleNotifications = [ 
    {
    title: "Road Repair Work in Sector 5",
    description: "The road near Green Park will be under maintenance this week.",
    type: "Infrastructure",
  },
  {
    title: "Water Supply Disruption",
    description: "Water supply will be disrupted in your locality on April 12 from 10 AM - 4 PM.",
    type: "Utility",
  },
  {
    title: "Public Hearing on Local Park Renovation",
    description: "Join the community discussion on plans for upgrading the community park.",
    type: "Community",
  },
  {
    title: "Power Outage Notification",
    description: "Scheduled power maintenance will occur on April 13 from 9 AM to 1 PM in Sector 12.",
    type: "Utility",
  },
  {
    title: "Vaccination Drive - Free COVID Boosters",
    description: "A free COVID-19 vaccination drive will be held at the community hall on April 15.",
    type: "Health",
  },
  {
    title: "Street Light Fault Reported",
    description: "Street lights near Avenue Road have been reported faulty. Maintenance team will inspect tonight.",
    type: "Maintenance",
  },
  {
    title: "Garbage Pickup Delay",
    description: "Garbage collection will be delayed by one day this week due to a municipal strike.",
    type: "Sanitation",
  },
  {
    title: "Community Sports Event This Sunday",
    description: "Don't miss the annual sports fest at the town field. Starts at 9 AM. All are welcome!",
    type: "Event",
  },
  {
    title: "Noise Complaint Hearing",
    description: "A public hearing will be held regarding repeated noise complaints in Block D.",
    type: "Public Safety",
  },
  {
    title: "Free Tree Plantation Drive",
    description: "Join the local tree plantation campaign this weekend and receive free saplings.",
    type: "Environment",
  }
 ];

function getRandomNotification() {
  const item = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
  return {
    id: Math.floor(Math.random() * 10000),
    title: item.title,
    description: item.description,
    type: item.type,
    date: new Date().toLocaleString(),
  };
}

module.exports = {
  sampleNotifications,
  getRandomNotification,
};
