import * as React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function EditCourse() {
  const navigate = useNavigate();
  let { cid } = useParams();
  const [course, setCourse] = React.useState();
  
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:3000/get/course/" + cid, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setCourse(res.data.crs);
    })();
  }, []);
  if (!course) {
    return (
      <>
        <Card
          style={{
            borderRadius: 0,
            marginTop: "10px",
            boxShadow: "0px 0px 3px black",
            minHeight: "85vh",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "end", margin: "20px" }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#202124" }}
              onClick={() => {
                navigate("/admcourse");
              }}
            >
              Back to Courses
            </Button>
          </div>
          course not availaible
        </Card>
      </>
    );
  }
  
  return (
    <Update course={course}></Update>   
  );
}

function Update({course}){
    const navigate = useNavigate();
    const [title, setTitle] = React.useState(course.title);
  const [description,setdescription]=React.useState(course.description);
  const [imgLink,setimgLink]=React.useState(course.imgLink);
  const [price,setprice]=React.useState(course.price);
    return <>
    
      <Card
        style={{
          borderRadius: 0,
          marginTop: "10px",
          boxShadow: "0px 0px 3px black",
          minHeight: "85vh",
        }}
      >
        <div style={{ display: "flex", justifyContent: "end", margin: "20px" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#202124" }}
            onClick={() => {
              navigate("/admcourse");
            }}
          >
            Back to Courses
          </Button>
        </div>
        <Typography
          style={{
            margin: "20px",
            fontSize: "40px",
          }}
        >
          Edit Course:
        </Typography>
        <Grid container spacing={2} style={{ padding: "5px" }}>
          <Grid item xs={7}>
            <div
              style={{
                paddingTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "500px",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  value={title}
                  id="outlined-basic"
                  label="Course Name"
                  variant="outlined"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <TextField
                    value={description}
                  id="outlined-basic"
                  label="Course Description"
                  variant="outlined"
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
                <TextField
                value={imgLink}
                  id="outlined-basic"
                  label="Image Link"
                  variant="outlined"
                  onChange={(e) => {
                    setimgLink(e.target.value);
                  }}
                />
                <TextField
                value={price}
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: "#202124" }}
                  onClick={async () => {
                    const res = await axios.put(
                      "http://localhost:3000/admin/courses/"+course._id,
                      {
                        title: title,
                        description: description,
                        price: price,
                        imgLink: imgLink,
                      },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    alert("Course Updated")
                  }}
                >
                  Edit Course
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={5}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "300px",
                  border: "3px solid black",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBlock: "20px",
                }}
              >
                <Div style={{ fontSize: "large" }}>{title}</Div>
                <div>
                  {" "}
                  <img
                    src={imgLink}
                    alt="#"
                    style={{ width: "100%", aspectRatio: "2" }}
                  />
                </div>
                <Div>{description}</Div>
                <Div>Price:{price}</Div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#202124" }}
                >
                  Buy Course
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
}

export default EditCourse;
