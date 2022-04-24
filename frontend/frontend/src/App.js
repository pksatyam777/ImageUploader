import { React, useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacebookLoginn from "./Components/Auth/facebookLogin";
import GoogleLogin from "./Components/Auth/googleLogin";
import "./App.css";




const App = () => {
  const [imgName, setImageName] = useState("");
  const [imgSrc, setImageSrc] = useState("");
  const [imgAlt, setImageAlt] = useState("");
  const [category, setCategory] = useState("");
  const [display, setDisplay] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [style,setStyle] = useState({display:"none",height:"6rem"})
  const [finalDisplay,setFinalDisplay] = useState([]);
  const handleSubmit = (e) => {
    setTimeout(() => {
      window.location.reload(false);
    }, 8000);

    e.preventDefault();
    const data = {
      name: imgName,
      image: imgSrc,
      description: imgAlt,
      category: category,
    };
    const options = {
      headers: { "content-type": "multipart/form-data" },
    };
    const datas = new FormData();
    datas.append("name", data.name);
    datas.append("image", data.image);
    datas.append("description", data.description);
    datas.append("category", data.category);

    axios
      .post("http://localhost:8000/api/images/new/", datas, options)
      .then((res) => {
        console.log(res);
        toast.success("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Image Upload Failed");
      });
    console.log(data);

    setImageName("");
    setImageSrc("");
    setImageAlt("");
    setCategory("");
  };
  useEffect(() => {
    axios.get("http://localhost:8000/api/images/").then((res) => {
      console.log(res);

      setDisplay(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(display.filter(item => item.name.toLowerCase().includes(searchTerm)));
    
    
    setDisplay(display.filter(item => item.name.toLowerCase().includes(searchTerm)));
    
    setTimeout(() => {
    axios.get("http://localhost:8000/api/images/").then((res) => {
      console.log(res);

      setDisplay(res.data);
    });
  }, 8000);
   setTimeout(() => {
    setSearchTerm("");
  }, 8000);
    
    
    
    
    }
    
  

  

  return (
    
    <div>
      <ToastContainer />
      <div className="row">
        <div className="col-md-4">
          <Card
            style={{
              width: "20rem",
              height: "36rem",
              marginTop: "4%",
              marginLeft: "10%",
            }}
          >
            <Card.Body>
              <h1>Image Upload</h1>

              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={imgName}
                placeholder="Enter Name of the Image"
                aria-describedby="passwordHelpBlock"
                onChange={(e) => setImageName(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Please enter the name of the image here.
              </Form.Text>

              <br />

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Images Here</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageSrc(e.target.files[0])}
                />
              </Form.Group>

              <Form.Label htmlFor="inputPassword5">Description</Form.Label>
              <Form.Control
                type="text"
                value={imgAlt}
                placeholder="Enter description"
                aria-describedby="passwordHelpBlock"
                onChange={(e) => setImageAlt(e.target.value)}
              />

              <br />
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="select Category">select Category</option>
                <option value="IT Corporate ">IT Corporate</option>
                <option value="Medical">Medical</option>
                <option value="Automobile">Automobile</option>
              </select>
              <br />
              <br />
              <Button variant="dark" onClick={handleSubmit}>
                Submit
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-8">
          <Form.Control
            type="text"
            placeholder="Search Name here"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            aria-describedby="passwordHelpBlock"
            style={{ marginTop: "1.5%" }}
          />
          <br />
          <Button variant="dark" style={{width:"13%"}} onClick={handleSearch}>
                Search
              </Button>

          <FacebookLoginn />
          <GoogleLogin />
          <br /><br />
          <div className="row">
            {display.map((item, index) => (
              <div className="col-md-2" key={index}>
                <div key={index}>
                  <Card className="card"
                    style={{
                      width: "8rem",
                      height: "8rem",
                      marginLeft: "2%",
                      marginTop: "4%",
                    }}
                  >
                    <Card.Img
                      className="Img"
                      style={{
                        width: "100%",
                        height: "15vw",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={`http://localhost:8000${item.image}`}
                      href="google.com"
                      alt={item.image_caption}
                      onMouseEnter={(e)=>{setStyle({display:"block"})}} onMouseLeave={(e)=>{setStyle({display:"none"})}}/>
                    
                  </Card>
                  <Card.Body style={{ height: "8rem" }} >
                      
                      <Card.Title style={style[(index)]} >
                        {item.image_name}
                      </Card.Title>
                      
                      
                    </Card.Body>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
