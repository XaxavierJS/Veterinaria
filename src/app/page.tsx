import React from "react";
import Grid from "@mui/material/Grid";

import CitasResumen from "@/components/dashboard/CitasResumen";
import GananciasAnuales from "@/components/dashboard/GananciasAnuales";
import GananciasMensuales from "@/components/dashboard/GananciasMensuales";
import ProximasCitas from "@/components/dashboard/ProximasCitas";
import TutoresFrecuentes from "@/components/dashboard/TutoresFrecuentes";

const DashboardPage = () => {
  return (
    <Grid container spacing={4}>
      {/* Primera parte */}
      <Grid item xs={12} md={8}>
        <CitasResumen />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <GananciasAnuales />
          </Grid>
          <Grid item>
            <GananciasMensuales />
          </Grid>
        </Grid>
      </Grid>

      {/* Segunda parte */}
      <Grid item xs={12} md={4}>
        <ProximasCitas />
      </Grid>
      <Grid item xs={12} md={6}>
        <TutoresFrecuentes />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
