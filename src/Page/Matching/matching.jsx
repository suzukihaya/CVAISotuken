import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Button,
  Box,
  TextField,
  Autocomplete,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import companies from "../../const/companies"; // インポートを修正
import MyContext from "../../provider/provider";

const options = companies.map((company) => ({
  label: company.name,
  id: company.id, // 企業IDを追加
}));

export function Matching() {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { providerid, setproviderid } = useContext(MyContext);

  const handleCompanyChange = (event, value) => {
    if (value) {
      setSelectedCompany(value);
      setproviderid(value.id);
      console.log("Selected company ID:", value.id);
    } else {
      setSelectedCompany(null);
    }
    console.log("Provider ID:", providerid);
  };

  const handleCompanyInfoClick = () => {
    if (selectedCompany) {
      navigate(`/companyinformation`);
    } else {
      alert("企業を選択してください");
    }
  };

  const onClick = () => {
    navigate("/Matchtable");
  };

  return (
    <div>
      <Box p={2} className="footer">
        <Stack direction="row" justifyContent="flex-start" alignSelf="center">
          <h1 className="title">名産会マッチング</h1>
          <div id="hart">
            <Tooltip title="マッチ度">
              <IconButton
                aria-label="ハート"
                onClick={() => navigate("/Matchdo")}
              >
                <FavoriteIcon sx={{ color: "#ff1493", fontSize: 60 }} />
              </IconButton>
            </Tooltip>
          </div>
          <div id="mylist">
            <Tooltip title="ブックマーク">
              <IconButton
                aria-label="マイリスト"
                onClick={() => navigate("/mylist")}
              >
                <PersonIcon sx={{ color: "black", fontSize: 60 }} />
              </IconButton>
            </Tooltip>
          </div>
          <div id="setting">
            <Tooltip title="設定">
              <IconButton
                aria-label="設定"
                onClick={() => navigate("/Setting")}
              >
                <SettingsIcon sx={{ color: "gray", fontSize: 60 }} />
              </IconButton>
            </Tooltip>
          </div>
        </Stack>
      </Box>

      <div className="gamen">
        <div className="menu">
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              className="b1"
              onClick={() =>
                (window.location.href =
                  "http://career-center.nkc.internal/kyujin-kensaku.html")
              }
              sx={{
                width: 250,
                height: 100,
                fontSize: 40,
                padding: 5,
              }}
              variant="contained"
            >
              企業検索
            </Button>

            <Button
              className="b2"
              onClick={() =>
                (window.location.href = "http://intra2.denpa.ac.jp/job/2024/")
              }
              sx={{
                width: 250,
                height: 100,
                fontSize: 40,
                padding: 5,
              }}
              variant="contained"
            >
              求人票
            </Button>

            <Button
              className="b3"
              onClick={() =>
                (window.location.href =
                  "http://intra2.denpa.ac.jp/e-learning/job/")
              }
              sx={{
                width: 250,
                height: 100,
                fontSize: 23,
                padding: 5,
              }}
              variant="contained"
            >
              就職ガイダンス
            </Button>

            <Button
              className="b4"
              onClick={onClick}
              sx={{
                width: 250,
                height: 100,
                fontSize: 30,
                padding: 5,
              }}
              variant="contained"
            >
              マッチ度表
            </Button>
          </Stack>
        </div>

        <div className="main">
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            onChange={handleCompanyChange}
            noOptionsText="企業候補がありません。"
            renderInput={(params) => (
              <TextField
                {...params}
                label="企業名入力"
                variant="outlined"
                sx={{
                  backgroundColor: "lightgray",
                }}
              />
            )}
            className="textfield"
          />

          <Button
            className="b5"
            onClick={handleCompanyInfoClick}
            sx={{
              padding: 2,
            }}
            variant="contained"
          >
            企業情報
          </Button>

          <Button
            className="b6"
            onClick={onClick}
            sx={{
              padding: 2,
            }}
            variant="contained"
          >
            先輩情報
          </Button>

          <Button
            className="b7"
            onClick={() => navigate("/Conditions")}
            sx={{
              padding: 2,
            }}
            variant="contained"
          >
            AI
          </Button>
        </div>
      </div>
      <head>
        <link
          href="matching.css"
          rel="stylesheet"
          type="text/css"
          media="all"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
    </div>
  );
}

export default Matching;
