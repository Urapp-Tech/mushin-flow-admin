import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  DollarSign,
  FileText,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './components/ui/chart';

const lineChartData = [
  { month: 'January', percentage: 74 },
  { month: 'February', percentage: 78 },
  { month: 'March', percentage: 82 },
  { month: 'April', percentage: 84 },
  { month: 'May', percentage: 72 },
  { month: 'June', percentage: 68 },
];
const lineChartConfig = {
  percentage: {
    label: 'Percentage',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const chartData = [{ percentage: 15.7, fill: 'var(--tw-color-yellow-300)' }];
const chartConfig = {
  percentage: {
    label: 'Percentage',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const chartData2 = [{ percentage: 80, fill: 'var(--tw-color-yellow-300)' }];
const chartConfig2 = {
  percentage: {
    label: 'Percentage',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

function Dashboard() {
  return (
    <main className="tw:flex-1 tw:p-6">
      <div className="tw:space-y-6">
        {/* Time Period Selector */}
        <div className="tw:flex tw:space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="tw:rounded-2xl tw:text-gray-600"
          >
            7D
          </Button>
          <Button
            variant="default"
            size="sm"
            className="tw:rounded-2xl tw:bg-gray-900 tw:text-white"
          >
            30D
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="tw:rounded-2xl tw:text-gray-600"
          >
            90D
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="tw:rounded-2xl tw:text-gray-600"
          >
            1Y
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="tw:grid tw:grid-cols-4 tw:gap-6">
          <Card className="tw:bg-zinc-100">
            <CardHeader className="tw:pb-2">
              <CardTitle className="tw:flex tw:items-center tw:text-sm tw:font-medium tw:text-gray-500">
                <UserCheck className="tw:mr-2 tw:h-4 tw:w-4" />
                Total Waitlist Sign-Ups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tw:text-3xl tw:font-bold">585</div>
              <p className="tw:text-sm tw:text-green-600">
                +12.9% Vs Last Period
              </p>
            </CardContent>
          </Card>

          <Card className="tw:bg-yellow-300">
            <CardHeader className="tw:pb-2">
              <CardTitle className="tw:flex tw:items-center tw:text-sm tw:font-medium tw:text-gray-800">
                <Users className="tw:mr-2 tw:h-4 tw:w-4" />
                Total Paid Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tw:text-3xl tw:font-bold tw:text-gray-900">
                242
              </div>
              <p className="tw:text-sm tw:text-gray-700">
                +8.3% Vs Last Period
              </p>
            </CardContent>
          </Card>

          <Card className="tw:bg-zinc-100">
            <CardHeader className="tw:pb-2">
              <CardTitle className="tw:flex tw:items-center tw:text-sm tw:font-medium tw:text-gray-500">
                <DollarSign className="tw:mr-2 tw:h-4 tw:w-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tw:text-3xl tw:font-bold">$11,700</div>
              <p className="tw:text-sm tw:text-green-600">
                +15.7% Vs Last Period
              </p>
            </CardContent>
          </Card>

          <Card className="tw:bg-zinc-100">
            <CardHeader className="tw:pb-2">
              <CardTitle className="tw:flex tw:items-center tw:text-sm tw:font-medium tw:text-gray-500">
                <TrendingUp className="tw:mr-2 tw:h-4 tw:w-4" />
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tw:text-3xl tw:font-bold">41.1%</div>
              <p className="tw:text-sm tw:text-green-600">
                +3.7% Vs Last Period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="tw:grid tw:grid-cols-3 tw:gap-6">
          {/* AOV Chart - Takes up left column */}
          <Card className="tw:col-span-1 tw:bg-zinc-100">
            <CardHeader>
              <CardTitle className="tw:flex tw:items-center tw:text-sm tw:font-medium tw:text-gray-500">
                <FileText className="tw:mr-2 tw:h-4 tw:w-4" />
                AOV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tw:mb-2 tw:text-3xl tw:font-bold">$11,700</div>
              <p className="tw:mb-4 tw:text-sm tw:text-green-600">
                +15.7% Vs Last Period
              </p>
              <ChartContainer config={lineChartConfig}>
                <LineChart
                  accessibilityLayer
                  data={lineChartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="percentage"
                    type="natural"
                    stroke="var(--color-percentage)"
                    strokeWidth={2}
                    dot={{
                      fill: 'var(--color-percentage)',
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Behavioral KPIs - Takes up right 2 columns with 2x2 grid */}
          <Card className="tw:col-span-2 tw:bg-zinc-100">
            <CardHeader>
              <CardTitle className="tw:flex tw:items-center tw:text-sm tw:font-medium tw:text-gray-500">
                <BarChart3 className="tw:mr-2 tw:h-4 tw:w-4" />
                Behavioral KPIs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tw:grid tw:h-full tw:grid-cols-2 tw:gap-6">
                {/* Screen time */}
                <div className="tw:rounded-lg tw:bg-white tw:p-4 tw:text-center">
                  <h4 className="tw:text-sm tw:font-medium">Screen time</h4>
                  <ChartContainer
                    config={chartConfig}
                    className="tw:mx-auto tw:aspect-square tw:w-full tw:max-w-[250px]"
                  >
                    <RadialBarChart
                      data={chartData}
                      startAngle={180}
                      endAngle={(chartData[0].percentage / 100) * 180}
                      innerRadius={100}
                      outerRadius={110}
                    >
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <PolarRadiusAxis
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) - 16}
                                    className="tw:fill-foreground tw:text-2xl tw:font-bold"
                                  >
                                    +{chartData[0].percentage}%
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </PolarRadiusAxis>
                      <RadialBar
                        dataKey="percentage"
                        stackId="a"
                        cornerRadius={2}
                        fill="var(--color-percentage)"
                        className="tw:stroke-transparent tw:stroke-2"
                      />
                    </RadialBarChart>
                  </ChartContainer>
                  <p className="tw:text-lg tw:font-bold">4:35 Hours</p>
                  <p className="tw:text-xs tw:text-gray-500">on average</p>
                </div>

                {/* Task Completion */}
                <div className="tw:rounded-lg tw:bg-white tw:p-4 tw:text-center">
                  <h4 className="tw:text-sm tw:font-medium">Task Completion</h4>
                  <ChartContainer
                    config={chartConfig2}
                    className="tw:mx-auto tw:aspect-square tw:max-h-[250px]"
                  >
                    <RadialBarChart
                      data={chartData2}
                      startAngle={0}
                      endAngle={(chartData2[0].percentage / 100) * 360}
                      innerRadius={100}
                      outerRadius={110}
                    >
                      <PolarGrid
                        gridType="circle"
                        radialLines={false}
                        stroke="none"
                        className="tw:first:fill-muted tw:last:fill-background"
                        polarRadius={[108, 92]}
                      />
                      <RadialBar
                        dataKey="percentage"
                        background
                        cornerRadius={10}
                      />
                      <PolarRadiusAxis
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="tw:fill-foreground tw:text-4xl tw:font-bold"
                                  >
                                    {chartData2[0].percentage.toLocaleString()}%
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="tw:fill-muted-foreground"
                                  >
                                    Almost There
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </PolarRadiusAxis>
                    </RadialBarChart>
                  </ChartContainer>
                </div>

                {/* Most-Used Templates */}
                <div className="tw:rounded-lg tw:bg-white tw:p-4 tw:text-center">
                  <h4 className="tw:mb-3 tw:text-sm tw:font-medium">
                    Most-Used Templates
                  </h4>
                  <div className="tw:space-y-2">
                    <div className="tw:relative tw:isolate tw:overflow-hidden tw:rounded-sm">
                      <div className="tw:absolute tw:z-10 tw:h-full tw:w-full tw:rounded-sm tw:bg-yellow-100"></div>
                      <div className="tw:absolute tw:z-20 tw:h-full tw:w-3/6 tw:rounded-sm tw:bg-yellow-300"></div>
                      <div className="tw:relative tw:z-30 tw:rounded tw:p-2 tw:px-2 tw:py-4 tw:text-start tw:text-xs">
                        template name 1
                      </div>
                    </div>
                    <div className="tw:relative tw:isolate tw:overflow-hidden tw:rounded-sm">
                      <div className="tw:absolute tw:z-10 tw:h-full tw:w-full tw:rounded-sm tw:bg-yellow-100"></div>
                      <div className="tw:absolute tw:z-20 tw:h-full tw:w-5/6 tw:rounded-sm tw:bg-yellow-300"></div>
                      <div className="tw:relative tw:z-30 tw:rounded tw:p-2 tw:px-2 tw:py-4 tw:text-start tw:text-xs">
                        template name 2
                      </div>
                    </div>
                    <div className="tw:relative tw:isolate tw:overflow-hidden tw:rounded-sm">
                      <div className="tw:absolute tw:z-10 tw:h-full tw:w-full tw:rounded-sm tw:bg-yellow-100"></div>
                      <div className="tw:absolute tw:z-20 tw:h-full tw:w-2/6 tw:rounded-sm tw:bg-yellow-300"></div>
                      <div className="tw:relative tw:z-30 tw:rounded tw:p-2 tw:px-2 tw:py-4 tw:text-start tw:text-xs">
                        template name 3
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top User */}
                <div className="tw:relative tw:isolate tw:overflow-hidden tw:rounded-lg tw:bg-white tw:text-center">
                  <img
                    src="https://fastly.picsum.photos/id/669/200/200.jpg?hmac=lAa_bMRK0BRBCTEvl1acVqTfEDrXQc0yNwi683-13cE"
                    alt="Top User"
                    className="tw:absolute tw:h-full tw:w-full tw:object-cover"
                  />
                  <div className="tw:relative tw:h-full tw:flex-col tw:justify-between tw:overflow-hidden tw:rounded-lg tw:p-4">
                    <div className="tw:text-white"> Top User</div>
                    <div className="tw:py-17"></div>
                    <div className="tw:text-white"> @Korey32 </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
