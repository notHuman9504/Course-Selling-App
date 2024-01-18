import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
function AdminCourse() {
    const navigate = useNavigate();
  return (
    <>
      <Card
      
        style={{
          borderRadius: 0,
          marginTop: "10px",
          boxShadow: "0px 0px 3px black",
          minHeight:"85vh"
        }}
      >
        
      </Card>
    </>
  );
}
export default AdminCourse;
