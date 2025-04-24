import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define our data structure
interface WorkflowData {
  department: string;
  stage1Approved: number;
  stage1Rejected: number;
  stage2Approved: number;
  stage2Rejected: number;
  stage3Approved: number;
  stage3Rejected: number;
  stage4Approved: number;
  stage4Rejected: number;
}

const WorkflowChart = () => {
  // Sample data - replace with your actual data
  const [data] = useState<WorkflowData[]>([
    {
      department: "HR",
      stage1Approved: 45,
      stage1Rejected: 15,
      stage2Approved: 38,
      stage2Rejected: 7,
      stage3Approved: 30,
      stage3Rejected: 8,
      stage4Approved: 25,
      stage4Rejected: 5,
    },
    {
      department: "Finance",
      stage1Approved: 60,
      stage1Rejected: 20,
      stage2Approved: 50,
      stage2Rejected: 10,
      stage3Approved: 42,
      stage3Rejected: 8,
      stage4Approved: 35,
      stage4Rejected: 7,
    },
    {
      department: "IT",
      stage1Approved: 75,
      stage1Rejected: 25,
      stage2Approved: 65,
      stage2Rejected: 10,
      stage3Approved: 55,
      stage3Rejected: 10,
      stage4Approved: 45,
      stage4Rejected: 10,
    },
    {
      department: "Marketing",
      stage1Approved: 50,
      stage1Rejected: 10,
      stage2Approved: 45,
      stage2Rejected: 5,
      stage3Approved: 40,
      stage3Rejected: 5,
      stage4Approved: 35,
      stage4Rejected: 5,
    },
    {
      department: "Operations",
      stage1Approved: 65,
      stage1Rejected: 15,
      stage2Approved: 55,
      stage2Rejected: 10,
      stage3Approved: 45,
      stage3Rejected: 10,
      stage4Approved: 40,
      stage4Rejected: 5,
    }
  ]);

  // Define colors for our bars
  const colors = {
    approved: "#4caf50", // Green for approved
    rejected: "#f44336"  // Red for rejected
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Department Workflow Status</h1>
      
      <div className="h-[600px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="department" 
              label={{ value: 'Department', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              label={{ value: 'Number of Tickets', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            
            {/* Stage 1 */}
            <Bar 
              dataKey="stage1Approved" 
              name="Stage 1 - Approved" 
              fill={colors.approved} 
              stackId="stage1" 
            />
            <Bar 
              dataKey="stage1Rejected" 
              name="Stage 1 - Rejected" 
              fill={colors.rejected} 
              stackId="stage1" 
            />
            
            {/* Stage 2 */}
            <Bar 
              dataKey="stage2Approved" 
              name="Stage 2 - Approved" 
              fill={colors.approved} 
              stackId="stage2" 
            />
            <Bar 
              dataKey="stage2Rejected" 
              name="Stage 2 - Rejected" 
              fill={colors.rejected} 
              stackId="stage2" 
            />
            
            {/* Stage 3 */}
            <Bar 
              dataKey="stage3Approved" 
              name="Stage 3 - Approved" 
              fill={colors.approved} 
              stackId="stage3" 
            />
            <Bar 
              dataKey="stage3Rejected" 
              name="Stage 3 - Rejected" 
              fill={colors.rejected} 
              stackId="stage3" 
            />
            
            {/* Stage 4 */}
            <Bar 
              dataKey="stage4Approved" 
              name="Stage 4 - Approved" 
              fill={colors.approved} 
              stackId="stage4" 
            />
            <Bar 
              dataKey="stage4Rejected" 
              name="Stage 4 - Rejected" 
              fill={colors.rejected} 
              stackId="stage4" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Chart Description</h2>
        <p>
          This chart displays the workflow status for different departments. Each department has four stages of ticket processing,
          and each stage has two possible statuses: Approved (green) and Rejected (red). The height of each bar represents the 
          number of tickets in that particular stage and status.
        </p>
      </div>
    </div>
  );
};

export default WorkflowChart;