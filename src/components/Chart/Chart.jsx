import React, { useState, useEffect } from "react";
import { getEmployees } from "../../services/Api";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import "./Chart.scss";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 2px solid #1976d2;
  text-align: center;
`;

export function Chart() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const renderTreeNodes = (employee) => (
    <TreeNode
      key={employee.id}
      label={
        <StyledNode>
          <img
            src={employee.imageUrl}
            alt={employee.firstName}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
          <br />
          {employee.firstName} {employee.lastName}
          <br />
          {employee.position}
        </StyledNode>
      }
    >
      {employee.children &&
        employee.children.map((child) => renderTreeNodes(child))}
    </TreeNode>
  );

  const rootEmployee = employees.find(
    (employee) => employee.position === "CEO"
  );

  const buildTree = () => {
    const positionMap = {};

    employees.forEach((employee) => {
      if (employee.position !== "CEO") {
        if (!positionMap[employee.position]) {
          positionMap[employee.position] = [];
        }
        positionMap[employee.position].push(employee);
      }
    });

    const positionGroups = Object.keys(positionMap).map((position) => ({
      position,
      employees: positionMap[position],
    }));

    return positionGroups;
  };

  const positionGroups = rootEmployee ? buildTree() : [];

  return (
    <div className="chart-container">
      <div>
        <h1 className="chart-title">Hijerarhijska struktura zaposlenika</h1>
      </div>
      <div className="card">
        {rootEmployee ? (
          <Tree
            lineWidth={"2px"}
            lineColor={"#b8b8b8"}
            lineBorderRadius={"10px"}
            label={
              <StyledNode>
                <img
                  src={rootEmployee.imageUrl}
                  alt={rootEmployee.firstName}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "100%",
                    objectFit: "cover",
                  }}
                />
                <br />
                {rootEmployee.firstName} {rootEmployee.lastName}
                <br />
                {rootEmployee.position}
              </StyledNode>
            }
          >
            {positionGroups.map((group) => (
              <TreeNode
                key={group.position}
                label={
                  <StyledNode>
                    {group.employees.map((employee) =>
                      renderTreeNodes(employee)
                    )}
                  </StyledNode>
                }
              ></TreeNode>
            ))}
          </Tree>
        ) : (
          <p>Učitavanje zaposlenika...</p>
        )}
      </div>
    </div>
  );
}
