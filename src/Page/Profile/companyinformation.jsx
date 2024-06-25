import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessIcon from "@mui/icons-material/Business";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { gray, primarycolor } from "../../const/color";
import axios from "axios";
import "normalize.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  zIndex: open ? 100 : 1,
  ...(open && {
    width: `100%`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const menuItems = [
  {
    text: "企業検索",
    icon: <BusinessIcon />,
    link: "https://www.meisankai.net/student/company/",
  },
  {
    text: "求人票",
    icon: <EventNoteIcon />,
    link: "https://www.meisankai.net/student",
  },
  {
    text: "マッチング",
    icon: <ContentPasteSearchIcon />,
    link: "/Matching",
    isNavigate: true,
  },
  { text: "プロフィール", icon: <PersonIcon />, link: "/profile-st" },
  { text: "設定", icon: <SettingsIcon />, link: "/Setting", isNavigate: true },
];

export function Companyinformation() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleItemClick = (link, isNavigate) => {
    if (isNavigate) {
      navigate(link);
    } else if (link) {
      window.location.href = link;
    }
  };

  const fetchCompanyInformation = async () => {
    try {
      const requestData = {
        request: "company_information",
        id: 45,
      };
      console.log("Sending request data:", requestData);
      const response = await axios.post("/api/", requestData);
      setCompany(response.data.result); // response.data.result をセット
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("送信失敗: ", error); // エラー詳細を表示
    }
  };

  useEffect(() => {
    fetchCompanyInformation();
  }, []);

  const theme = createTheme({
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: primarycolor,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: gray,
          },
        },
      },
    },
  });

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: primarycolor,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box />
              <Typography variant="h6" noWrap component="div">
                名産会マッチングシステム／企業情報
              </Typography>
            </Box>
            <Button color="inherit" onClick={() => navigate("/Loginpage")}>
              ログイン
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader />
          <Divider />
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleItemClick(item.link, item.isNavigate)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
                {index === 2 && (
                  <Box my={1}>
                    <Divider />
                  </Box>
                )}
              </React.Fragment>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Typography
            style={{ fontSize: "2em", textAlign: "left" }}
            sx={{ mx: 4 }}
          >
            <li key={company.id}>{company.name}</li>
          </Typography>
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                業種:職種
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.category}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                会社概要
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.detail}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                所在地
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.office}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                役員
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.representative}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                創業
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.foundation_date}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                資本金
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.capital}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                売上高
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.amount_of_sales}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                従業員数
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.number_of_employees}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                電話番号
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.phone_number}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                メールアドレス
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.email}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                募集人数
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.recruitment_numbers}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                募集学科
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.recruitment_grade}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                必須資格
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.qualification}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                求める人物像
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.ideal_candidate_profile}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                勤務地
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.work_location}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                労働時間
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.working_hours}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                休暇制度
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.holiday}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                給与
                <Stack display="flex" direction="row">
                  4年課程基本給:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.Four_year_course_basic_salary}
                  </Typography>
                  +4年課程諸手当:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.Four_year_course_allowances}
                  </Typography>
                  =4年課程総合計:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.Four_year_course_salary_total}
                  </Typography>
                </Stack>
                <Stack display="flex" direction="row">
                  3年課程基本給:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.Three_year_course_basic_salary}
                  </Typography>
                  +3年課程諸手当:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.Three_year_course_allowances}
                  </Typography>
                  =3年課程総合計:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.Three_year_course_salary_total}
                  </Typography>
                </Stack>
                <Stack display="flex" direction="row">
                  2年課程基本給:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.Two_year_course_basic_salary}
                  </Typography>
                  +2年課程諸手当:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.Two_year_course_allowances}
                  </Typography>
                  =2年課程総合計:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.Two_year_course_salary_total}
                  </Typography>
                </Stack>
                <Stack display="flex" direction="row">
                  1年課程基本給:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.One_year_course_basic_salary}
                  </Typography>
                  +1年課程諸手当:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.One_year_course_allowances}
                  </Typography>
                  =1年課程総合計:
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.One_year_course_salary_total}
                  </Typography>
                </Stack>
                <Stack display="flex" direction="row">
                  その他
                  <Typography style={{ fontSize: "1em" }} key={company.id}>
                    {company.others}
                  </Typography>
                </Stack>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                その他制度
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.allowances}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                企業理念
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.corporate_philosophy}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                特徴
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  {company.appeal}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" width="85%" border={1} p={2}>
              <Typography style={{ fontSize: "1.5em" }}>
                ホームページ
                <Typography style={{ fontSize: "1em" }} key={company.id}>
                  <a href={company.website}>{company.website}</a>
                </Typography>
              </Typography>
            </Box>
          </Stack>
          <p></p>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
