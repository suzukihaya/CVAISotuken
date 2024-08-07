//#region import
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Autocomplete,
  Button,
  Box,
  Checkbox,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
  MobileStepper,
  MenuItem,
  Select,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ArrowDropupIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import {
  industry,
  occupation,
  person,
  qualification,
  area,
} from "../Companyadd/companydata";

//#endregion
export function Addcompany() {
  const navigate = useNavigate();

  const theme = useTheme();

  //#region 定数

  const [name, setName] = useState("");
  const [selectindustry, setSelectIndustry] = useState("");
  const [selectoccupation, setSelectOccupation] = useState("");
  const [capital, setCapital] = useState("");
  const [sales, setSales] = useState("");
  const [employees, setEmployees] = useState("");

  const [selectarea, setSelectArea] = useState([]);
  const [worktime, setWorktime] = useState("");
  const [holiday, setHoliday] = useState("");
  const [holidaysystem, setHolidaysystem] = useState("");
  const [selectqualification, setSelectQualification] = useState([]);

  const [FourYearSalary, setFourYearSalary] = useState(0);
  const [ThreeYearSalary, setThreeYearSalary] = useState(0);
  const [TwoYearSalary, setTwoYearSalary] = useState(0);
  const [OneYearSalary, setOneYearSalary] = useState(0);
  const [FourYearAllowances, setFourYearAllowances] = useState(0);
  const [ThreeYearAllowances, setThreeYearAllowances] = useState(0);
  const [TwoYearAllowances, setTwoYearAllowances] = useState(0);
  const [OneYearAllowances, setOneYearAllowances] = useState(0);

  const [selectperson, setSelectPerson] = useState([]);
  //#endregion

  //#region ステッパー
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = useState(false);

  const handleNext = () => {
    if (activeStep === 6) {
      setOpen(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const valid0 = () => {
    return (
      name !== "" &&
      selectindustry !== null &&
      selectoccupation !== null &&
      sales !== "" &&
      employees !== ""
    );
  };

  const valid1 = () => {
    return (
      selectarea.length > 0 &&
      worktime !== "" &&
      holiday !== "" &&
      holidaysystem !== "" &&
      selectqualification.length > 0
    );
  };

  const valid2 = () => {
    return (
      itcheck.includes(true) ||
      gamecheck.includes(true) ||
      eizocheck.includes(true) ||
      denkicheck.includes(true) ||
      tsusincheck.includes(true) ||
      kikaicheck.includes(true)
    );
  };

  const valid4 = () => {
    return selectperson.length === 3;
  };

  const nextdisabled = () => {
    switch (activeStep) {
      case 0:
        return !valid0();
      case 1:
        return !valid1();
      case 2:
        return !valid2();
      case 4:
        return !valid4();
      default:
        return false;
    }
  };

  //#endregion

  //登録→トップページ（仮）へ
  const handleConfirm = () => {
    setOpen(false);
    navigate("/");
  };

  const handleClose = () => {
    setOpen(false);
  };

  //数値入力制約
  const valuechange = (event, setValue) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });

    const numericValue = inputValue.replace(/[^0-9]/g, "");
    setValue(numericValue);

    const formattedValue = addCommas(numericValue);

    setValue(formattedValue);
  };

  function addCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handlePerson = (event) => {
    const value = event.target.name;
    setSelectPerson((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, value];
      }
      return prevSelected;
    });
  };

  //#region picture
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      setZoom(1);
      setPositionX(0);
      setPositionY(0);
      setPreviousPosition({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  //#region  画像調整
  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(0.5, prevZoom - 0.1));
  };

  const handleMoveUp = () => {
    setPositionY((prevY) => {
      setPreviousPosition((prevPos) => ({ ...prevPos, y: prevPos.y - 10 }));
      return prevY - 10;
    });
  };

  const handleMoveDown = () => {
    setPositionY((prevY) => {
      setPreviousPosition((prevPos) => ({ ...prevPos, y: prevPos.y + 10 }));
      return prevY + 10;
    });
  };

  const handleMoveLeft = () => {
    setPositionX((prevX) => {
      setPreviousPosition((prevPos) => ({ ...prevPos, x: prevPos.x - 10 }));
      return prevX - 10;
    });
  };

  const handleMoveRight = () => {
    setPositionX((prevX) => {
      setPreviousPosition((prevPos) => ({ ...prevPos, x: prevPos.x + 10 }));
      return prevX + 10;
    });
  };
  //#endregion

  //#region 画像up
  const handleUpload = () => {
    if (!previewUrl) {
      return;
    }

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = containerWidth;
      canvas.height = containerHeight;

      const scaledWidth = img.width * zoom;
      const scaledHeight = img.height * zoom;

      const drawX = (containerWidth - scaledWidth) / 2 + positionX;
      const drawY = (containerHeight - scaledHeight) / 2 + positionY;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        drawX,
        drawY,
        scaledWidth,
        scaledHeight
      );

      const dataUrl = canvas.toDataURL("image/png");
      const fileName = `${name}.png`;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = fileName;
      a.click();
    };
    img.src = previewUrl;
  };
  //#endregion

  //#endregion

  //#region 学科チェック連動
  const [itcheck, setItCheck] = React.useState([false, false, false, false]);

  const it = (event) => {
    setItCheck([
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };
  const it4 = (event) => {
    setItCheck([event.target.checked, itcheck[1], itcheck[2], itcheck[3]]);
  };

  const it3 = (event) => {
    setItCheck([itcheck[0], itcheck[1], event.target.checked, itcheck[3]]);
  };

  const it2 = (event) => {
    setItCheck([itcheck[0], event.target.checked, itcheck[2], itcheck[3]]);
  };

  const it321 = (event) => {
    setItCheck([itcheck[0], itcheck[1], itcheck[2], event.target.checked]);
  };

  const [gamecheck, setGameCheck] = React.useState([false, false, false]);

  const game = (event) => {
    setGameCheck([
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };
  const game4 = (event) => {
    setGameCheck([event.target.checked, gamecheck[1], gamecheck[2]]);
  };
  const game2 = (event) => {
    setGameCheck([gamecheck[0], event.target.checked, gamecheck[2]]);
  };
  const game21 = (event) => {
    setGameCheck([gamecheck[0], gamecheck[1], event.target.checked]);
  };

  const [eizocheck, setEizoCheck] = React.useState([false, false]);

  const eizo = (event) => {
    setEizoCheck([event.target.checked, event.target.checked]);
  };
  const eizo3 = (event) => {
    setEizoCheck([event.target.checked, eizocheck[1]]);
  };
  const eizo2 = (event) => {
    setEizoCheck([eizocheck[0], event.target.checked]);
  };

  const [denkicheck, setDenkiCheck] = React.useState([false, false]);

  const denki = (event) => {
    setDenkiCheck([event.target.checked, event.target.checked]);
  };
  const denki3 = (event) => {
    setDenkiCheck([event.target.checked, denkicheck[1]]);
  };
  const denki2 = (event) => {
    setDenkiCheck([denkicheck[0], event.target.checked]);
  };

  const [tsusincheck, setTsusinCheck] = React.useState([false, false]);

  const tsusin = (event) => {
    setTsusinCheck([event.target.checked, event.target.checked]);
  };
  const tsusin3 = (event) => {
    setTsusinCheck([event.target.checked, tsusincheck[1]]);
  };
  const tsusin2 = (event) => {
    setTsusinCheck([tsusincheck[0], event.target.checked]);
  };

  const [kikaicheck, setKikaiCheck] = React.useState([false, false]);

  const kikai = (event) => {
    setKikaiCheck([event.target.checked, event.target.checked]);
  };
  const kikai3 = (event) => {
    setKikaiCheck([event.target.checked, kikaicheck[1]]);
  };
  const kikai2 = (event) => {
    setKikaiCheck([kikaicheck[0], event.target.checked]);
  };

  const all = (event) => {
    setItCheck([
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
    setGameCheck([
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
    setEizoCheck([event.target.checked, event.target.checked]);
    setDenkiCheck([event.target.checked, event.target.checked]);
    setTsusinCheck([event.target.checked, event.target.checked]);
    setKikaiCheck([event.target.checked, event.target.checked]);
  };
  //#endregion

  //gakka
  const generateSelectedCoursesText = (
    itcheck,
    gamecheck,
    eizocheck,
    denkicheck,
    tsusincheck,
    kikaicheck
  ) => {
    const allChecked =
      itcheck.every(Boolean) &&
      gamecheck.every(Boolean) &&
      eizocheck.every(Boolean) &&
      denkicheck.every(Boolean) &&
      tsusincheck.every(Boolean) &&
      kikaicheck.every(Boolean);

    if (allChecked) {
      return "不問";
    }

    const courses = [];
    const sendcourses = [];

    if (itcheck.every(Boolean)) {
      courses.push("コンピューター・IT");
      sendcourses.push("it4", "it3", "it2", "it1");
    } else {
      const subCourses = [];
      if (itcheck[0]) {
        subCourses.push("4年");
        sendcourses.push("it4");
      }
      if (itcheck[1]) {
        subCourses.push("2年");
        sendcourses.push("it2");
      }
      if (itcheck[2]) {
        subCourses.push("3年");
        sendcourses.push("it3");
      }
      if (itcheck[3]) {
        subCourses.push("3年・2年＋1年");
        sendcourses.push("it1");
      }
      if (subCourses.length > 0)
        courses.push(`コンピューター・IT(${subCourses.join("、")})`);
    }

    if (gamecheck.every(Boolean)) {
      courses.push("ゲーム・CG");
      sendcourses.push("game4", "game2", "game1");
    } else {
      const subCourses = [];
      if (gamecheck[0]) {
        subCourses.push("4年");
        sendcourses.push("game4");
      }
      if (gamecheck[1]) {
        subCourses.push("2年");
        sendcourses.push("game2");
      }
      if (gamecheck[2]) {
        subCourses.push("2年+1年");
        sendcourses.push("game1");
      }
      if (subCourses.length > 0)
        courses.push(`ゲーム・CG(${subCourses.join("、")})`);
    }

    if (eizocheck.every(Boolean)) {
      courses.push("映像・音響");
      sendcourses.push("eizo2", "eizo1");
    } else {
      const subCourses = [];
      if (eizocheck[0]) {
        subCourses.push("2年+1年");
        sendcourses.push("eizo1");
      }
      if (eizocheck[1]) {
        subCourses.push("2年");
        sendcourses.push("eizo2");
      }
      if (subCourses.length > 0)
        courses.push(`映像・音響(${subCourses.join("、")})`);
    }

    if (denkicheck.every(Boolean)) {
      courses.push("電気");
      sendcourses.push("denki2", "denki1");
    } else {
      const subCourses = [];
      if (denkicheck[0]) {
        subCourses.push("2年+1年");
        sendcourses.push("denki1");
      }
      if (denkicheck[1]) {
        subCourses.push("2年");
        sendcourses.push("denki2");
      }
      if (subCourses.length > 0) courses.push(`電気(${subCourses.join("、")})`);
    }

    if (tsusincheck.every(Boolean)) {
      courses.push("情報通信");
      sendcourses.push("tsusin2", "tsusin1");
    } else {
      const subCourses = [];
      if (tsusincheck[0]) {
        subCourses.push("2年+1年");
        sendcourses.push("tsusin1");
      }
      if (tsusincheck[1]) {
        subCourses.push("2年");
        sendcourses.push("tsusin2");
      }
      if (subCourses.length > 0)
        courses.push(`情報通信(${subCourses.join("、")})`);
    }

    if (kikaicheck.every(Boolean)) {
      courses.push("機械・CADデザイン");
      sendcourses.push("kikai2", "kikai1");
    } else {
      const subCourses = [];
      if (kikaicheck[0]) {
        subCourses.push("2年+1年");
        sendcourses.push("kikai1");
      }
      if (kikaicheck[1]) {
        subCourses.push("2年");
        sendcourses.push("kikai2");
      }
      if (subCourses.length > 0)
        courses.push(`機械・CADデザイン(${subCourses.join("、")})`);
    }

    console.log(sendcourses);
    return courses.length > 0 ? courses.join("、") : "不問";
  };

  //ステップごとのコンテンツ
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: "10vh",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="h5" align="center">
              企業情報
            </Typography>
            <TextField
              id="companyname"
              label="会社名"
              value={name}
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              sx={{ width: "90%", maxWidth: "400px" }}
              required
            />
            <FormControl sx={{ width: "90%", maxWidth: "400px" }} required>
              <InputLabel sx={{ ml: -2 }}>業種</InputLabel>
              <Select
                id="industry"
                variant="standard"
                value={selectindustry}
                onChange={(event) => setSelectIndustry(event.target.value)}
              >
                {industry.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "90%", maxWidth: "400px" }} required>
              <InputLabel sx={{ ml: -2 }}>職種</InputLabel>
              <Select
                id="occupation"
                variant="standard"
                value={selectoccupation}
                onChange={(event) => setSelectOccupation(event.target.value)}
              >
                {occupation.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="capital"
              label="資本金"
              value={capital}
              variant="standard"
              sx={{ width: "90%", maxWidth: "400px" }}
              onChange={(e) => valuechange(e, setCapital)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">百万円</InputAdornment>
                ),
              }}
              required
            />
            <TextField
              id="sales"
              label="売上高"
              variant="standard"
              sx={{ width: "90%", maxWidth: "400px" }}
              value={sales}
              onChange={(e) => valuechange(e, setSales)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">百万円</InputAdornment>
                ),
              }}
              required
            />
            <TextField
              id="employees"
              label="従業員数"
              variant="standard"
              sx={{ width: "90%", maxWidth: "400px" }}
              value={employees}
              onChange={(e) => valuechange(e, setEmployees)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">人</InputAdornment>
                ),
              }}
              required
            />
          </Box>
        );
      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: "10vh",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="h5">求人条件</Typography>
            <Autocomplete
              id="area"
              multiple
              limitTags={3}
              sx={{ width: "90%", maxWidth: "400px" }}
              value={selectarea}
              onChange={(event, newValue) => setSelectArea(newValue)}
              options={area}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="勤務地"
                  variant="standard"
                  required
                />
              )}
            />
            <FormGroup sx={{ width: "90%", maxWidth: "400px" }}>
              <FormLabel required>勤務体系</FormLabel>
              <RadioGroup
                row
                value={worktime}
                onChange={(event, newValue) => setWorktime(newValue)}
              >
                <FormControlLabel
                  value="固定時間"
                  control={<Radio />}
                  label="固定時間"
                />
                <FormControlLabel
                  value="変形労働時間"
                  control={<Radio />}
                  label="変形労働時間"
                />
                <FormControlLabel
                  value="フレックス"
                  control={<Radio />}
                  label="フレックス"
                />
              </RadioGroup>
            </FormGroup>
            <TextField
              id="holiday"
              label="年間休日"
              variant="standard"
              sx={{ width: "90%", maxWidth: "400px" }}
              value={holiday}
              onChange={(e) => valuechange(e, setHoliday)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">日</InputAdornment>
                ),
              }}
              required
            />
            <FormGroup sx={{ width: "90%", maxWidth: "400px" }}>
              <FormLabel required>休日制度</FormLabel>
              <RadioGroup
                row
                value={holidaysystem}
                onChange={(event, newValue) => setHolidaysystem(newValue)}
              >
                <FormControlLabel
                  value="完全週休二日制"
                  control={<Radio />}
                  label="完全週休二日制"
                />
                <FormControlLabel
                  value="週休二日制"
                  control={<Radio />}
                  label="週休二日制"
                />
                <FormControlLabel
                  value="その他"
                  control={<Radio />}
                  label="その他"
                />
              </RadioGroup>
            </FormGroup>
            <Autocomplete
              multiple
              limitTags={1}
              sx={{ width: "90%", maxWidth: "400px" }}
              value={selectqualification}
              onChange={(event, newValue) => setSelectQualification(newValue)}
              options={qualification}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="必須資格(ない場合は不問を選択)"
                  variant="standard"
                  required
                />
              )}
            />
          </Box>
        );
      case 2:
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mt: "10vh",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="h5">募集学科</Typography>
            <FormGroup sx={{ width: "90%", maxWidth: "400px" }}>
              <Stack direction="row" spacing={0.1} p={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        itcheck.every(Boolean) &&
                        gamecheck.every(Boolean) &&
                        eizocheck[0] &&
                        eizocheck[1] &&
                        denkicheck[0] &&
                        denkicheck[1] &&
                        tsusincheck[0] &&
                        tsusincheck[1] &&
                        kikaicheck[0] &&
                        kikaicheck[1]
                      }
                      onChange={all}
                    />
                  }
                />
                <Typography variant="h6" p={1} pl={2}>
                  不問
                </Typography>
              </Stack>

              {/* IT 学科のスタック */}
              <Stack direction="row" spacing={0.1} p={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={itcheck.every(Boolean)}
                      indeterminate={
                        itcheck.some(Boolean) && !itcheck.every(Boolean)
                      }
                      onChange={it}
                    />
                  }
                />
                <Accordion
                  sx={{
                    width: "100%", // 幅を100%に設定
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    コンピューター・IT
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControlLabel
                      control={<Checkbox checked={itcheck[0]} onChange={it4} />}
                      label="4年"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={itcheck[2]} onChange={it3} />}
                      label="3年"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={itcheck[1]} onChange={it2} />}
                      label="2年"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={itcheck[3]} onChange={it321} />
                      }
                      label="3年・2年＋1年"
                    />
                  </AccordionDetails>
                </Accordion>
              </Stack>

              <Stack direction="row" spacing={0.1} width={400} p={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gamecheck.every(Boolean)}
                      indeterminate={
                        gamecheck.some(Boolean) && !gamecheck.every(Boolean)
                      }
                      onChange={game}
                    />
                  }
                />
                <Accordion
                  sx={{
                    width: "90%",
                    maxWidth: "400px",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    ゲーム・CG
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControlLabel
                      control={
                        <Checkbox checked={gamecheck[0]} onChange={game4} />
                      }
                      label="4年"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={gamecheck[1]} onChange={game2} />
                      }
                      label="2年"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={gamecheck[2]} onChange={game21} />
                      }
                      label="2年+1年"
                    />
                  </AccordionDetails>
                </Accordion>
              </Stack>
              <Stack direction="row" spacing={0.1} width={400} p={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={eizocheck[0] && eizocheck[1]}
                      indeterminate={eizocheck[0] !== eizocheck[1]}
                      onChange={eizo}
                    />
                  }
                />
                <Accordion
                  sx={{
                    width: "90%",
                    maxWidth: "400px",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    映像・音響
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControlLabel
                      control={
                        <Checkbox checked={eizocheck[1]} onChange={eizo2} />
                      }
                      label="2年"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={eizocheck[0]} onChange={eizo3} />
                      }
                      label="2年+1年"
                    />
                  </AccordionDetails>
                </Accordion>
              </Stack>
              <Stack direction="row" spacing={0.1} width={400} p={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={denkicheck[0] && denkicheck[1]}
                      indeterminate={denkicheck[0] !== denkicheck[1]}
                      onChange={denki}
                    />
                  }
                />
                <Accordion
                  sx={{
                    width: "90%",
                    maxWidth: "400px",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    電気
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControlLabel
                      control={
                        <Checkbox checked={denkicheck[1]} onChange={denki2} />
                      }
                      label="2年"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={denkicheck[0]} onChange={denki3} />
                      }
                      label="2年+1年"
                    />
                  </AccordionDetails>
                </Accordion>
              </Stack>
              <Stack direction="row" spacing={0.1} width={400} p={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tsusincheck[0] && tsusincheck[1]}
                      indeterminate={tsusincheck[0] !== tsusincheck[1]}
                      onChange={tsusin}
                    />
                  }
                />
                <Accordion
                  sx={{
                    width: "90%",
                    maxWidth: "400px",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    情報通信
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControlLabel
                      control={
                        <Checkbox checked={tsusincheck[1]} onChange={tsusin2} />
                      }
                      label="2年"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tsusincheck[0]} onChange={tsusin3} />
                      }
                      label="2年+1年"
                    />
                  </AccordionDetails>
                </Accordion>
              </Stack>
              <Stack direction="row" spacing={0.1} width={400} p={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={kikaicheck[0] && kikaicheck[1]}
                      indeterminate={kikaicheck[0] !== kikaicheck[1]}
                      onChange={kikai}
                    />
                  }
                />
                <Accordion
                  sx={{
                    width: "90%",
                    maxWidth: "400px",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    機械・CADデザイン
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControlLabel
                      control={
                        <Checkbox checked={kikaicheck[1]} onChange={kikai2} />
                      }
                      label="2年"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={kikaicheck[0]} onChange={kikai3} />
                      }
                      label="2年+1年"
                    />
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </FormGroup>
          </Box>
        );
      case 3:
        // ITまたはゲームの4年のチェック
        const isFourYearSelected = itcheck[0] || gamecheck[0];
        //ITの3年のチェック
        const isComputerIT3YearSelected = itcheck[2];
        //2年のチェック
        const isTwoYearSelected =
          itcheck[1] ||
          gamecheck[1] ||
          eizocheck[1] ||
          denkicheck[1] ||
          tsusincheck[1] ||
          kikaicheck[1];
        //研究科のチェック
        const isOneYearSelected =
          itcheck[3] ||
          gamecheck[2] ||
          eizocheck[0] ||
          denkicheck[0] ||
          tsusincheck[0] ||
          kikaicheck[0];

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mt: "10vh",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="h5">給与情報</Typography>

            {isFourYearSelected && (
              <>
                <TextField
                  id="salary-4"
                  label="4年課程基本給"
                  variant="standard"
                  value={FourYearSalary || ""}
                  onChange={(e) => valuechange(e, setFourYearSalary)}
                  sx={{ width: "90%", maxWidth: "400px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">円</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="allowances-4"
                  label="4年課程諸手当"
                  variant="standard"
                  value={FourYearAllowances || ""}
                  onChange={(e) => valuechange(e, setFourYearAllowances)}
                  sx={{ width: "90%", maxWidth: "400px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">円</InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            {isComputerIT3YearSelected && (
              <>
                <TextField
                  id="salary-3"
                  label="3年課程基本給"
                  variant="standard"
                  value={ThreeYearSalary || ""}
                  onChange={(e) => valuechange(e, setThreeYearSalary)}
                  sx={{ width: "90%", maxWidth: "400px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">円</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="allowances-3"
                  label="3年課程諸手当"
                  variant="standard"
                  value={ThreeYearAllowances || ""}
                  onChange={(e) => valuechange(e, setThreeYearAllowances)}
                  sx={{ width: "90%", maxWidth: "400px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">円</InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            {isTwoYearSelected && (
              <>
                <TextField
                  id="salary-2"
                  label="2年課程基本給"
                  variant="standard"
                  value={TwoYearSalary || ""}
                  onChange={(e) => valuechange(e, setTwoYearSalary)}
                  sx={{ width: "90%", maxWidth: "400px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">円</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="allowances-2"
                  label="2年課程諸手当"
                  variant="standard"
                  value={TwoYearAllowances || ""}
                  onChange={(e) => valuechange(e, setTwoYearAllowances)}
                  sx={{ width: "90%", maxWidth: "400px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">円</InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            {isOneYearSelected && (
              <>
                <TextField
                  id="salary-1"
                  label="研究科基本給"
                  variant="standard"
                  value={OneYearSalary || ""}
                  onChange={(e) => valuechange(e, setOneYearSalary)}
                  sx={{ width: "90%", maxWidth: "400px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">円</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="allowances-1"
                  label="研究科諸手当"
                  variant="standard"
                  value={OneYearAllowances || ""}
                  onChange={(e) => valuechange(e, setOneYearAllowances)}
                  sx={{ width: "90%", maxWidth: "400px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">円</InputAdornment>
                    ),
                  }}
                />
              </>
            )}
          </Box>
        );
      case 4:
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mt: "10vh",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="h5">求める人物像</Typography>
            <FormLabel>当てはまる上位3つの項目を選択してください</FormLabel>
            <FormGroup>
              <Grid container spacing={2} justifyContent="center">
                {person.map((person, index) => (
                  <Grid item xs={6} key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ ml: "20%", mr: -10 }}
                          name={person}
                          checked={selectperson.includes(person)}
                          onChange={handlePerson}
                          disabled={
                            !selectperson.includes(person) &&
                            selectperson.length >= 3
                          }
                        />
                      }
                      label={
                        <Typography noWrap sx={{ ml: "30%", mr: 0 }}>
                          {person}
                        </Typography>
                      }
                      style={{
                        width: "100%",
                        textAlign: "center",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </Box>
        );
      case 5:
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mt: "10vh",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="h5">画像のアップロード（任意）</Typography>
            <Typography variant="body1">
              企業一覧に表示する画像として使用します
              <br />
              プロフィールで変更することも可能です
            </Typography>
            <Typography variant="body2" color="textSecondary">
              画像ファイル（.jpg, .jpeg, .png）のみ
              <br />
              アップロードできます
            </Typography>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
            />

            {previewUrl && (
              <Box
                ref={containerRef}
                sx={{
                  border: "2px solid black",
                  padding: "10px",
                  width: 300,
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <IconButton
                  onClick={handleMoveUp}
                  style={{
                    position: "absolute",
                    top: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}
                >
                  <ArrowDropupIcon />
                </IconButton>
                <IconButton
                  onClick={handleMoveDown}
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}
                >
                  <ArrowDropDownIcon />
                </IconButton>
                <IconButton
                  onClick={handleMoveLeft}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 10,
                    transform: "translateY(-50%)",
                    zIndex: 1,
                  }}
                >
                  <ArrowLeftIcon />
                </IconButton>
                <IconButton
                  onClick={handleMoveRight}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 10,
                    transform: "translateY(-50%)",
                    zIndex: 1,
                  }}
                >
                  <ArrowRightIcon />
                </IconButton>
                <IconButton
                  onClick={handleZoomIn}
                  disabled={zoom >= 2}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 2,
                  }}
                >
                  <ZoomInIcon />
                </IconButton>
                <IconButton
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.5}
                  style={{
                    position: "absolute",
                    top: 40,
                    right: 10,
                    zIndex: 2,
                  }}
                >
                  <ZoomOutIcon />
                </IconButton>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transformOrigin: "center",
                    transform: `scale(${zoom})`,
                  }}
                >
                  <img
                    ref={imageRef}
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      objectFit: "contain",
                      transform: `translate(${positionX}px, ${positionY}px)`,
                    }}
                  />
                </div>
              </Box>
            )}
            {/* <Button variant="contained" color="primary" onClick={handleUpload}>
              アップロード
          </Button> */}
          </Box>
        );
      case 6:
        const selectedCoursesText = generateSelectedCoursesText(
          itcheck,
          gamecheck,
          eizocheck,
          denkicheck,
          tsusincheck,
          kikaicheck
        );

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mt: "10vh",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="h5">登録確認</Typography>
            <List
              sx={{
                maxWidth: "500px", // 最大幅を500pxに設定します
                width: "90%", // 幅を画面の90%に設定します
                margin: "auto", // 中央揃えにします
              }}
            >
              <ListItem>
                <ListItemText primary={`会社名　　：　${name}`} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={`業種　　　：　${selectindustry}`} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={`職種　　　：　${selectoccupation}`} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={`資本金　　：　${capital}百万円`} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={`売上高　　：　${sales}百万円`} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={`従業員数　：　${employees}人`} />
              </ListItem>{" "}
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary={`勤務地　　：　${selectarea
                    .map((area) => area.title)
                    .join(", ")}`}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary={`必須資格　：　${selectqualification
                    .map((qualification) => qualification.title)
                    .join(", ")}`}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={`勤務体系　：　${worktime}`} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={`年間休日　：　${holiday}日`} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={`休日体系　：　${holidaysystem}`} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary={`募集学科　：　${selectedCoursesText}`}
                />
              </ListItem>
              <Divider component="li" />
              <List>
                <ListItem>
                  <ListItemText
                    primary="　※募集しない学科がある場合、0円と表示されます"
                    primaryTypographyProps={{
                      sx: {
                        color: "rgba(0, 0, 0, 0.54)",
                        fontSize: "0.8rem",
                        lineHeight: "0.6",
                      },
                    }}
                  />
                </ListItem>
              </List>
              <ListItem>
                <ListItemText
                  primary={`4年過程基本給 ： ${FourYearSalary}円 / 諸手当 ： ${FourYearAllowances}円`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`3年過程基本給 ： ${ThreeYearSalary}円 / 諸手当 ： ${ThreeYearAllowances}円`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`2年過程基本給 ： ${TwoYearSalary}円 / 諸手当 ： ${TwoYearAllowances}円`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`研究科基本給　： ${OneYearSalary}円 / 諸手当 ： ${OneYearAllowances}円`}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary={`求める人物像： ${selectperson.join(", ")}`}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={"画像　　　　："} />
                <Box
                  ref={containerRef}
                  sx={{
                    border: "2px solid gray",
                    padding: "10px",
                    width: "150px",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                    mr: "20%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      transformOrigin: "center",
                      transform: `scale(${zoom / 2})`,
                    }}
                  >
                    <img
                      ref={imageRef}
                      src={previewUrl}
                      alt="デフォルト画像が使用されます"
                      style={{
                        objectFit: "contain",
                        transform: `translate(${positionX}px, ${positionY}px)`,
                      }}
                    />
                  </div>
                </Box>
              </ListItem>
            </List>
          </Box>
        );

      default:
        return (
          <div>
            <h2>Unknown</h2>
          </div>
        );
    }
  };

  return (
    <div>
      <div style={{ minHeight: "10vh" }}>{getStepContent(activeStep)}</div>
      <MobileStepper
        variant="dots"
        steps={7}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: "400px", flexGrow: 1, margin: "0 auto" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={nextdisabled()}
            sx={{ mt: 2 }}
          >
            {activeStep === 6 ? "登録" : "次へ"}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ mt: 2 }}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            戻る
          </Button>
        }
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "60%",
            maxWidth: "400px",
            height: "200px",
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center", fontSize: "2rem" }}>
          登録確認
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ textAlign: "center", fontSize: "1.2rem" }}
          >
            登録しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "gray" }}>
            キャンセル
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/*
作業memo
[済]研究科が常に表示される問題
[済]必須入力チェック
[済]企業情報の業種職種をセレクトボックス
登録完了を知らせるもの
マッチ度のための学科選択データ送信
デザイン（色）ほしいかも
リファクタリング
開始前の画面
*/
