import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { getEmployees, searchEmployees } from "../../services/Api";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";
import { SearchEmployee } from "../../components/SearchEmployee/SearchEmployee";
import { EmployeePopup } from "../EmployeePopup/EmployeePopup";
import "./EmployeeTable.scss";

export function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelecteEmployee] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const data = searchTerm
          ? await searchEmployees(searchTerm)
          : await getEmployees(page);
        setEmployees((prevEmployees) => {
          const newEmployees = data.data.filter(
            (employee) => !prevEmployees.some((e) => e.id === employee.id)
          );
          return searchTerm
            ? newEmployees
            : [...prevEmployees, ...newEmployees];
        });

        if (page >= data.last_page) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [page, searchTerm]);

  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasMore && !loading && !searchTerm) {
        setPage((prevPage) => prevPage + 1);
      }
    },
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    setEmployees([]);
    setHasMore(true);
  };

  const openPopup = (employeeId) => {
    setSelecteEmployee(employeeId);
  };

  const closePopup = () => {
    setSelecteEmployee(null);
  };

  return (
    <div className="table-container">
      <SearchEmployee onSearch={handleSearch} />

      <TableContainer component={Paper} className="table-content">
        <Table sx={{ maxWidth: 1200, margin: "0 auto 16px" }}>
          <TableHead className="table-head">
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Slika</TableCell>
              <TableCell>Ime</TableCell>
              <TableCell>Prezime</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Pozicija</TableCell>
              <TableCell>Akcija</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {loading ? (
              <SkeletonLoader rowsNum={10} />
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="number">{employee.id}</TableCell>
                  <TableCell>
                    <img
                      src={employee.imageUrl}
                      alt={`${employee.firstName} ${employee.lastName}`}
                    />
                  </TableCell>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openPopup(employee.id)}
                    >
                      Pregled
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div ref={ref} style={{ height: 1 }}></div>
      </TableContainer>

      {!hasMore && !loading && (
        <Typography variant="body1" align="center" style={{ margin: "20px 0" }}>
          Nema više zaposlenika
        </Typography>
      )}

      {selectedEmployee && (
        <EmployeePopup
          employeeId={selectedEmployee}
          employees={employees}
          onClose={closePopup}
        />
      )}
    </div>
  );
}
