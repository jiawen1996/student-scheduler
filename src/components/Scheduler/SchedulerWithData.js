import React from 'react'
import withFetchData from '../../HOC/withFetchData'
import Scheduler from "./Scheduler"
import withUVs from '../../HOC/withUVs';

export default withFetchData(withUVs(Scheduler))
