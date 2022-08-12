import React from "react";
import { Grid, Box, Container, Paper, Stack, Item } from "@mui/material";
import { useDogRecordsContext } from "../../contexts/dog-records";
import { useAdoptionInquiriesContext } from "../../contexts/adoption-inquiries";
import { DogRecordsContextProvider } from "../../contexts/dog-records";
import { AdoptionInquiriesContextProvider } from "../../contexts/adoption-inquiries";
import { StarredContextProvider, useStarredContext } from "../../contexts/starred";
import { useNavigate } from "react-router-dom";
import DogIcon from "./images/dog.png";
import Inquiry from "./images/conversation.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./AdminDashboardOverview.css";
import Calendar from "../Calendar/Calendar";

import UpdateFeed from "../UpdateFeed/UpdateFeed";

import { useState, useEffect } from "react";

export default function AdminDashboardOverviewContainer() {
  return (
    <DogRecordsContextProvider>
      <AdoptionInquiriesContextProvider>
        <StarredContextProvider>
          <AdminDashboardOverview />
        </StarredContextProvider>
      </AdoptionInquiriesContextProvider>
    </DogRecordsContextProvider>
  );
}

export function AdminDashboardOverview() {
  const { allAdoptionInquiries } = useAdoptionInquiriesContext();
  const { dogRecords } = useDogRecordsContext();
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [inquiryIsEmpty, setInquiryIsEmpty] = useState(false);
  const emptyInquiry = [
    {
      created_at: "",
      id: 0,
      user_first_name: "",
      email: "",
      phone_number: "",
      zipcode: "",
    },
  ];

  useEffect(() => {
    const fetchRecentInquiries = () => {
      const inquiries = allAdoptionInquiries.filter((inquiry) => {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        let date = new Date(inquiry.created_at);
        return date > sevenDaysAgo;
      });
      if (inquiries.length === 0) {
        setInquiryIsEmpty(true);
        setRecentInquiries(emptyInquiry);
      }
      setRecentInquiries(inquiries);
    };
    if (recentInquiries.length === 0 || !inquiryIsEmpty) {
      fetchRecentInquiries();
    }
  }, [recentInquiries, allAdoptionInquiries]);


  return (
    <Stack gap={3}>
      
      {/* item 1 in the page stack */}
      <h1 className="dashboard-header">Dashboard</h1>

      {/* item 2 in the page stack; everything under the dashboard header */}
        {/* width="1" to fill out stack container */}
      <Grid container spacing={5} xs={12} width="1">
        
        {/* column 1: navigation cards and recent adoption inquiries contained in a Stack */}
        <Grid item sm={12} md={8}>
          <Stack spacing={5}>
            
            {/* item 1 in column 1; "Dogs" and "Adoption Inquiries" cards */}
            <Grid container item spacing={2}>
              
              {/* "Dogs" card */}
              <Grid item xs={12} sm={6}>
                <NavigationCard 
                  imageUrl={DogIcon}
                  accentColor={"#697bbb"}
                  label={"Dogs"}
                  numberCount={dogRecords.length}
                  redirectLink={"/admin-dashboard/dog-record"}
                />
              </Grid>

              {/* "Adoption Inquiries" card */}
              <Grid item xs={12} sm={6}>
                <NavigationCard 
                    imageUrl={Inquiry}
                    accentColor={"#697bbb"}
                    label={"Adoption Inquiries"}
                    numberCount={allAdoptionInquiries.length}
                    redirectLink={"/admin-dashboard/adoption-inquiries"}
                  />
              </Grid>

            </Grid>

            {/* item 2 in column 1; Recent adoption inquiries table */}
            <Grid item>
              <Stack spacing={2}>
                <span className="dashboard-subheader-group">
                  <h4 className="dashboard-subheader">Adoption Inquiries</h4>
                  <h4 className="dashboard-subheader-detail">since last week</h4>
                </span>
                <AdoptionTable recentInquiries={recentInquiries} />
              </Stack>
            </Grid>

          </Stack>
        </Grid>
        {/* ---- end of column 1 ---- */}


        {/* ---- column 2: calendar and updates area ---- */}
        <Grid item xs={12} sm={4}>
          <Stack spacing={5}>

            {/* item 2 in column 2; calendar */}
            <Calendar className="custom-calendar" />

            {/* item 2 in column 2; updateFeed */}
            <Stack spacing={2}>
              <h4 className="dashboard-subheader">Updates</h4>
              <Box className="update-feed"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "var(--border-radius-small)",
                  boxShadow: "var(--card-box-shadow)",
                  padding: "var(--gap-medium)",
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 300,
                  overflow: "hidden",
                  overflowY: "scroll"
                }}
              >
                <UpdateFeed updateLimit={10} cardColor="#ffffff" />
              </Box>
            </Stack>
          </Stack>
        </Grid>
        {/* ---- end of column 2 ---- */}

      </Grid>
    </Stack>
  );
}

export function NewDogs({ dogRecords }) {
  const [recentDogs, setRecentDogs] = useState([]);
  const [dogsIsEmpty, setDogsIsEmpty] = useState(false);
  useEffect(() => {
    const fetchRecentDogs = () => {
      const dogs = dogRecords.filter((dog) => {
        const sevenDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        let date = new Date(dog.date_entered);
        return date > sevenDaysAgo;
      });
      if (dogs.length === 0) {
        setDogsIsEmpty(true);
      }
    };
    if (recentDogs.length === 0 || !dogsIsEmpty) {
      fetchRecentDogs();
    }
  }, [dogRecords, dogsIsEmpty, recentDogs]);
}

// Card component: "Dogs" or "Adoption Inquiries"
export function NavigationCard({ imageUrl, accentColor, label, numberCount, redirectLink }) {

  const navigate = useNavigate()
  
  // style object for the "Dogs" and "Adoption Inquiries" cards
  const paperStyle = {
    boxShadow: "var(--card-box-shadow)",
    borderRadius: "var(--border-radius-small)",
    width: 1,
    flexGrow: 1,
    height: 150,
    backgroundColor: "white",
    borderLeft: "solid",
    borderWidth: 5,
    borderColor: "#FEC272",
    opacity: 1,
    transition: "opacity .3s linear",
    "&:hover": {
      cursor: "pointer",
      opacity: 0.8,
    },
  }

  return (
    <Paper sx={paperStyle} className="navigation-card" elevation={0} onClick={() => {navigate(redirectLink);}}>
    {/* body of the card */}
    <Grid container item sx={{ height: "100%", marginLeft: 2 }} direction="row" alignItems="center"gap={3}>
      
      {/* Label and the count */}
      <Grid direction="column" item xs={8} >
        {/* "Dogs" label */}
        <Box justifyContent="center" alignItems="center" sx={{ fontWeight: 700, verticalAlign: "middle", color: accentColor}}>
          {label}
        </Box>
        {/* Count */}
        <Box item className="number-count">{numberCount}</Box>
      </Grid>

      {/* Dog icon */}
      <Grid item justifyContent="center" alignItems="center">
        <Box>
          <img
            height={50}
            width="auto"
            src={imageUrl}
            alt="inquiry"
          ></img>
        </Box>
      </Grid>

    </Grid>
  </Paper>

  )
}

export function AdoptionTable({ recentInquiries }) {
  const rows = [...recentInquiries];
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        boxShadow: "var(--card-box-shadow)",
        borderRadius: "var(--border-radius-small)",
        minHeight: "445px"
      }}
    >
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dog</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">ZIP</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            let date = new Date(row.created_at).toDateString();
            return (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.dog_name}
                </TableCell>
                <TableCell align="left" sx={{ border: "none" }}>
                  {row.user_first_name}
                </TableCell>
                <TableCell align="left" sx={{ border: "none" }}>
                  {row.email}
                </TableCell>
                <TableCell align="left" sx={{ border: "none" }}>
                  {row.phone_number || "N/A"}
                </TableCell>
                <TableCell align="left" sx={{ border: "none" }}>
                  {row.zipcode}
                </TableCell>
                <TableCell align="left" sx={{ border: "none" }}>
                  {date !== "Invalid Date" ? date : null}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
