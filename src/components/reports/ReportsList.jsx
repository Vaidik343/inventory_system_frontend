import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Alert,
} from "@mui/material";
import { useReport } from "../../context/ReportContext";
import { useAuth } from "../../context/AuthContext";
import { resolvePermissions } from "../../utils/resolvePermissions";

const Reports = () => {
  const {
    report,
    loading,
    getSalesReport,
    getProfitReport,
    getStockReport,
  } = useReport();
  const { userPermissions } = useAuth();

  const perms = resolvePermissions(userPermissions);
  const canViewReports = perms.can("report", "view");

  useEffect(() => {
    if (canViewReports) {
      getSalesReport(); // default load only if user has permission
    }
  }, [canViewReports]);

  // if (loading) {
  //   return (
  //     <Box display="flex" justifyContent="center" mt={4}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  if (!canViewReports) {
    return (
      <Box p={3}>
        <Alert severity="error">
          You do not have permission to view reports.
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Reports Dashboard
      </Typography>

      {/* Action buttons */}
      <Box mb={3} display="flex" gap={2}>
        <Button variant="contained" onClick={getSalesReport}>
          Sales Summary
        </Button>
        <Button variant="outlined" onClick={getProfitReport}>
          Profit Report
        </Button>
        <Button variant="outlined" onClick={getStockReport}>
          Stock Movements
        </Button>
      </Box>

      {/* SALES SUMMARY */}
      {report?.totalOrders !== undefined && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <ReportCard title="Total Orders" value={report.totalOrders} />
          </Grid>
          <Grid item xs={12} md={3}>
            <ReportCard title="Revenue" value={`₹${report.totalRevenue}`} />
          </Grid>
          <Grid item xs={12} md={3}>
            <ReportCard title="Refunded" value={`₹${report.totalRefunded}`} />
          </Grid>
          <Grid item xs={12} md={3}>
            <ReportCard
              title="Avg Order Value"
              value={`₹${report.avgOrderValue?.toFixed(2)}`}
            />
          </Grid>
        </Grid>
      )}

      {/* PROFIT REPORT */}
      {report?.profit !== undefined && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ReportCard title="Total Revenue" value={`₹${report.totalRevenue}`} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReportCard title="Total Cost" value={`₹${report.totalCost}`} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReportCard title="Profit" value={`₹${report.profit}`} />
          </Grid>
        </Grid>
      )}

      {/* STOCK MOVEMENT REPORT */}
      {Array.isArray(report?.movements) && (
        <Box mt={3}>
          <Typography variant="h6">Stock Movements</Typography>
          {report.movements.map((m) => (
            <Card key={m._id} sx={{ mt: 2 }}>
              <CardContent>
                <Typography>
                  Product: {m.productId?.name}
                </Typography>
                <Typography>
                  Reason: {m.reason}
                </Typography>
                <Typography>
                  Changed By: {m.changedBy?.email}
                </Typography>
                <Typography variant="caption">
                  {new Date(m.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

const ReportCard = ({ title, value }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </CardContent>
  </Card>
);

export default Reports;
