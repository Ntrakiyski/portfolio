export default function handler(req, res) {
  res.status(200).json([
    {
      welcomeMsg: "👋 Hi!",
    },
    { mainTitle: "I am Nik" },
    {
      subTitle: [
        "🗣 Product owner &  🕵️ Scrum master leading and improving Agile teams ",
        "Managing teams and creating software in the SaaS and CMS industry",
      ],
    },
    {
      usp: [
        "Manage teams to a successfully usable product",
        "Create design using Figma for Landing pages and SaaS ",
        "Manage teams to a successfully usable product",
      ],
    },
    {
      projects: [
        {
          title: "Landing page for a Sport platform",
          icons: [
            "/public/assets/images/react.png",
            "/public/assets/images/figma.png",
            "/public/assets/images/framer.png",
          ],
          background: "/public/assets/images/sportPlatform.jpg",
        },
        {
          title: "Transformed an internal product in a SaaS",
          icons: [
            "/public/assets/images/figma.png",
            "/public/assets/images/analytics.png",
          ],
          background: "/public/assets/images/saas.jpg",
        },
        {
          title: "Landing page for a Consulting agency",
          icons: [
            "/public/assets/images/figma.png",
            "/public/assets/images/miro.png",
            "/public/assets/images/jira.png",
          ],
          background: "/public/assets/images/consulting.jpg",
        },
      ],
    },
  ]);
}
