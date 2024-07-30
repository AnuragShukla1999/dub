import { AuthContext } from 'contexts/ConfigContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';


const DashDefault = () => {
  const { setProduct } = useContext(AuthContext);

  const formRef = useRef(null);

  const [productDetails, setProductDetails] = useState({
    fullName: '',
    mobileNo: '',
    email: '',
    completeAddress: '',
    pincode: '',
    state: '',
    city: '',
    landmark: '',
    orderId: '',
    orderDate: '',
    paymentMode: '',
    productName: '',
    category: '',
    quantity: '',
    orderValue: '',
    hsn: '',
    physicalWeight: '',
    length: '',
    breadth: '',
    height: '',
    courierservices: '',
    amount: ''
  });

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    console.log(e.target.value);

    // If the pincode changes manually, reset the location state
    if (e.target.name === 'pincode') {
      setLocation([]);
    }
  };

  //  for adding product details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:7000/api/productorderdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productDetails),
        credentials: 'include'
      });

      const resData = await res.json();
      console.log(resData);

      console.log(res);
      
      if (res.status == 201) {
        setProductDetails(resData);
        setProduct(resData);
        toast.success('Product Created Successfully');
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Error', error);
    }
  };


  // const generatePDF = (formData) => {
  //   const doc = new jsPDF();
  //   doc.text(`Name: ${formData.fullName}`, 10, 10);
  //   doc.text(`Email: ${formData.email}`, 10, 20);
  //   doc.text(`mobileNo: ${formData.mobileNo}`, 10, 30);
  //   doc.text(`completeAddress: ${formData.completeAddress}`, 10, 40);
  //   doc.text(`pincode: ${formData.pincode}`, 10, 50);
  //   doc.text(`state: ${formData.state}`, 10, 60);
  //   doc.text(`city: ${formData.city}`, 10, 70);
  //   doc.text(`landmark: ${formData.landmark}`, 10, 80);
  //   doc.text(`orderId: ${formData.orderId}`, 10, 90);
  //   doc.text(`orderDate: ${formData.orderDate}`, 10, 100);
  //   doc.text(`paymentMode: ${formData.paymentMode}`, 10, 110);
  //   doc.text(`productName: ${formData.productName}`, 10, 120);
  //   doc.text(`quantity: ${formData.quantity}`, 10, 130);
  //   doc.text(`orderValue: ${formData.orderValue}`, 10, 140);
  //   doc.text(`hsn: ${formData.hsn}`, 10, 150);
  //   doc.text(`physicalWeight: ${formData.physicalWeight}`, 10, 160);
  //   doc.text(`breadth: ${formData.breadth}`, 10, 170);
  //   doc.text(`height: ${formData.height}`, 10, 180);
  //   doc.text(`courierservices: ${formData.courierservices}`, 10, 190);
  //   doc.text(`amount: ${formData.amount}`, 10, 200);
  //   doc.save('form-data.pdf');
  // };


  // const handleSubmitPdf = () => {

  //   if (productDetails.fullName !== '' && productDetails.mobileNo !== '' && productDetails.email !== '' && productDetails.completeAddress !== '' && productDetails.pincode !== '' && productDetails.state !== '' && productDetails.city !== '' && productDetails.landmark !== '' && productDetails.orderId !== '' && productDetails.orderDate !== '' && productDetails.paymentMode !== '' && productDetails.productName !== '' && productDetails.quantity !== '' && productDetails.orderValue !== '' && productDetails.hsn !== '' && productDetails.physicalWeight !== '' && productDetails.breadth !== '' && productDetails.height !== '' && productDetails.courierservices !== '' && productDetails.amount !== '') {
  //     generatePDF(productDetails);
  //   }
  // };





  const generatePDF = ({
    fullName,
    email,
    mobileNo,
    completeAddress,
    pincode,
    state,
    city,
    landmark,
    orderId,
    orderDate,
    paymentMode,
    productName,
    quantity,
    orderValue,
    hsn,
    physicalWeight,
    breadth,
    height,
    courierservices,
    amount
  }) => {
    const doc = new jsPDF();
    let y = 10;

    // Iterate through fields dynamically and print them
    Object.entries({
      fullName,
      email,
      mobileNo,
      completeAddress,
      pincode,
      state,
      city,
      landmark,
      orderId,
      orderDate,
      paymentMode,
      productName,
      quantity,
      orderValue,
      hsn,
      physicalWeight,
      breadth,
      height,
      courierservices,
      amount
    }).forEach(([label, value]) => {
      doc.text(`${label}: ${value}`, 10, y);
      y += 10;
    });

    doc.save('form-data.pdf');
  };

  const handleSubmitPdf = () => {
    const requiredFields = [
      'fullName', 'mobileNo', 'email', 'completeAddress', 'pincode',
      'state', 'city', 'landmark', 'orderId', 'orderDate', 'paymentMode',
      'productName', 'quantity', 'orderValue', 'hsn', 'physicalWeight',
      'breadth', 'height', 'courierservices', 'amount'
    ];

    // Check if all required fields are present and non-empty
    if (requiredFields.every(field => productDetails[field] !== '')) {
      generatePDF(productDetails);
    } else {
      console.error('Some required fields are missing or empty.');
    }
  };




  const [location, setLocation] = useState([]);
  const [aaa, setAaa]  = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);


  const fetchLocation = async (e) => {
    const pincode = e.target.value;
    try {
      if (pincode.length === 6) {
        setIsLoadingLocation(true);
        const url = `http://localhost:7000/api/getlocation/${pincode}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        console.log(data.data);
        console.log(data.data.addresses);

        if (res.ok && data.data) {
          setLocation(data.data.addresses);
          setAaa(data.data);
          setProductDetails({
            ...productDetails,
            state: data.data.state, // Assuming data contains state information
            city: data.data.city // Assuming data contains city information
          });
        } else {
          setLocation([]);
          setAaa({});
          setProductDetails({ ...productDetails, state: '', city: '' });
        }

        console.log(location)
        setIsLoadingLocation(false);
      } else {
        setProductDetails({
          ...productDetails,
          state: '', 
          city: '' 
        });
      }
    } catch (error) {
      console.log("Error", error);
      setIsLoadingLocation(false);
      setProductDetails({ ...productDetails, state: '', city: '' });
    }
  }


  const handleLocationSelect = (e) => {
    const completeAddress = e.target.value;

    setProductDetails({
      ...productDetails,
      state: aaa.state,
      city: aaa.city,
      completeAddress: completeAddress
    })
  };
  

  return (
    <React.Fragment>
      <Form ref={formRef}>
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Consignee Details</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Costumer Full Name</Form.Label>
                      <Form.Control type="text" name="fullName" placeholder="Enter full name" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Mobile No</Form.Label>
                      <Form.Control type="number" name="mobileNo" placeholder="Enter mobile no" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Constumer Address</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Complete Address</Form.Label>
                      {/* <Form.Control type="text" name="completeAddress" placeholder="Enter address" onChange={handleChange} /> */}

                      {location.length > 0 && !isLoadingLocation ? (
                        <Form.Control as="select" name="completeAddress" onChange={handleLocationSelect}>
                          <option>Select Address...</option>
                          {location.map((loc, index) => (
                            <option key={loc._id} value={loc.locationName}>
                              {`${loc.locationName}`}
                            </option>
                          ))}
                        </Form.Control>
                      ) : (
                        <Form.Control type="text" placeholder="Enter Address"  />
                      )}
                      {isLoadingLocation && <p>Loading...</p>}
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control type="number" name="pincode" placeholder="Enter pincode" onChange={handleChange} onInput={fetchLocation} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>State</Form.Label>

                      <Form.Control type="text" name="state" placeholder="Enter state" onChange={handleLocationSelect} value={aaa.state ? productDetails.state : ''}  /> 

                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>City</Form.Label>

                      <Form.Control type="text" name="city" placeholder="Enter city" onChange={handleLocationSelect} value={aaa.city ? productDetails.city : ''} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Famous Landmark</Form.Label>
                      <Form.Control type="text" name="landmark" placeholder="Enter famous landmark" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Order Details</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Order id</Form.Label>
                      <Form.Control type="text" name="orderId" placeholder="Enter order id" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Order Date</Form.Label>
                      <Form.Control type="date" name="orderDate" placeholder="Enter order date" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                  {/* <Col md={4}>
                  <Form.Control size="lg" type="text" placeholder="Large text" className="mb-3" />
                  <Form.Control type="text" placeholder="Normal text" className="mb-3" />
                  <Form.Control size="sm" type="text" placeholder="Small text" className="mb-3" />
                </Col> */}
                  <Col md={4}>
                    <Form.Label>Payment Mode</Form.Label>
                    <Form.Control size="sm" as="select" className="mb-3" name="paymentMode" onChange={handleChange}>
                      <option value="cod">COD</option>
                      <option value="prepaid">Prepaid Card</option>
                    </Form.Control>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control type="text" name="productName" placeholder="Enter product name" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Label>Category</Form.Label>
                    <Form.Control size="sm" as="select" className="mb-3" name="category" onChange={handleChange}>
                      <option value="accessories">Accessories</option>
                      <option value="fashion and clothing">Fashion & Clothing</option>
                      <option value="accessories">Beauty and & Stationary</option>
                      <option value="electronics">Electronics</option>
                      <option value="fmcg">FMCG</option>
                      <option value="footwear">Footwear</option>
                      <option value="toys">Toys</option>
                      <option value="sports equipment">Sports Equipment</option>
                      <option value="others">Others</option>
                      <option value="wellness">Wellness</option>
                      <option value="medicines">Medicines</option>
                    </Form.Control>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Quantity (In Numbers)</Form.Label>
                      <Form.Control type="number" name="quantity" placeholder="Enter qunatity" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Order Value (In Numbers)</Form.Label>
                      <Form.Control type="number" name="orderValue" placeholder="Enter order value" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>HSN</Form.Label>
                      <Form.Control type="text" name="hsn" placeholder="Enter hsn" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Physical Weight</Form.Label>
                      <Form.Control type="text" name="physicalWeight" placeholder="Enter physical weight" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Length</Form.Label>
                      <Form.Control type="number" name="length" placeholder="Enter length" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Breadth</Form.Label>
                      <Form.Control type="number" name="breadth" placeholder="Enter breadth" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Height</Form.Label>
                      <Form.Control type="number" name="height" placeholder="Enter height" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Forwarding Through</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Label>courier services</Form.Label>
                    <Form.Control size="sm" as="select" className="mb-3" name="courierservices" onChange={handleChange}>
                      <option value="xpressbees">Xpressbees</option>
                      <option value="dtdc">DTDC Courier Service.</option>
                      <option value="delhivery">Delhivery</option>
                      <option value="indiaPost">IndiaPost</option>
                      <option value="bluedart">Blue Dart Express</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Total Amount</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control type="number" name="amount" placeholder="Enter amount" onChange={handleChange} />
                      {/* <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Add
        </button>
      <button className="btn btn-primary" onClick={handleSubmitPdf}>
        Print
      </button>
      </Form>
      
    </React.Fragment>
  );
};

export default DashDefault;
