import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import Chart from "react-apexcharts";

import { getSalesAxios } from "../../api/services";
import { MainLayout } from "../../layouts";
import { SaleType } from "../../models";

const style = {
  getChartStyling: (theme: Theme) => ({
    chart: {
      background: theme.palette.background.paper,
      toolbar: {
        show: false,
      },
    },
    colors: ["#13affe", "#fbab49"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: theme.palette.divider,
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      labels: {
        colors: theme.palette.text.secondary,
      },
      show: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      theme: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  }),
};

function DashboardDefaultContent() {
  const theme = useTheme();

  const [sales, setSales] = React.useState<SaleType[]>([]);

  const fetchSales = async () => {
    const { data } = await getSalesAxios();
    setSales(data);
  };

  React.useEffect(() => {
    fetchSales();
  }, []);

  return (
    <MainLayout title="Dashboard">
      <Container maxWidth="sm">
        <Typography color="textPrimary" variant="h4">
          Sales Dashboard
        </Typography>
        <Box my={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography color="textPrimary" variant="h5">
                    Sales
                  </Typography>
                  <Chart
                    height="100%"
                    options={style.getChartStyling(theme)}
                    series={sales}
                    type="bar"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default DashboardDefaultContent;
