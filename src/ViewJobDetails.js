import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewJobDetails.css'; // Import your CSS file for styling

const ViewJobDetails = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    fetch(`https://demo.jobsoid.com/api/v1/jobs/${jobId}`)
      .then(response => response.json())
      .then(data => {
        setJobDetails(data);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
      });
  }, [jobId]);

  if (!jobDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
      <div className='card'>
    <div className="job-details">
      {/* Title and Location Section */}
      <div className="title-section">
        <h2 className="job-title">{jobDetails.title}</h2>
        <p className="location">
          <i className="pi pi-map-marker location-icon" />
          {jobDetails.location && jobDetails.location.city},{' '}
          {jobDetails.location && jobDetails.location.state},{' '}
          {jobDetails.location && jobDetails.location.country}
        </p>
      </div>

      {/* Job Content Section */}
      <div className="job-content">
        <div className="info-section">
          <strong className="posted-date">
            Posted Date: {new Date(jobDetails.postedDate).toLocaleDateString()}
          </strong>
          <strong className="positions">Positions: {jobDetails.positions}</strong>
          <strong className="location">
            <i className="pi pi-map-marker location-icon" />
            Location: {jobDetails.location && jobDetails.location.city},{' '}
            {jobDetails.location && jobDetails.location.state},{' '}
            {jobDetails.location && jobDetails.location.country}
          </strong>
        </div>
        {/* Other job details */}
        <a href={jobDetails.hostedUrl} target="_blank" rel="noopener noreferrer">
          View Job Details
        </a>
        <a href={jobDetails.applyUrl} target="_blank" rel="noopener noreferrer">
          Apply Now
        </a>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ViewJobDetails;
