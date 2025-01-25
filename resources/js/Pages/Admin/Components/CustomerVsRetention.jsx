import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, { PureComponent } from 'react';

export default function CustomerVsRetention({data}) {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sell" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="retention" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
        </ResponsiveContainer>
    )
}
