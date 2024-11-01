import React from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
} from "@mui/material";

const UserList = ({ users, onDeleteUser }) => {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        User List
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} key={user._id}>
            <Card
              style={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {user.email}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onDeleteUser(user._id)}
                  style={{ marginTop: "10px" }}
                  fullWidth
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserList;
