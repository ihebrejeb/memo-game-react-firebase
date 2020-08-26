import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
export default function GameCard({ data }) {
  return (
    <Grid item xs={6} md={4}>
      <Grid container justify="center" alignItems="center">
        <Card style={{ width: "200px" }}>
          <CardContent>
            <h1>{data}</h1>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
