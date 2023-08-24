import React, { useState, useEffect } from 'react';
import './JobListings.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://demo.jobsoid.com/api/v1/jobs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setJobs(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching job listings:', error);
        setLoading(false);
      });
  }, []);

  // Function to extract content within the 'job-overview' div
  const extractJobOverview = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const jobOverview = doc.getElementById('job-overview');
    return jobOverview ? jobOverview.innerHTML : '';
  };

  const [expandedJobIds, setExpandedJobIds] = useState([]);

  const toggleJobExpansion = (jobId) => {
    if (expandedJobIds.includes(jobId)) {
      setExpandedJobIds(expandedJobIds.filter(id => id !== jobId));
    } else {
      setExpandedJobIds([...expandedJobIds, jobId]);
    }
  };

  return (
    <div>
      <h2>Job Listings</h2>
      <div className="p-grid p-col-gap">
        {loading ? (
          <p>Loading...</p>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="p-col-12 p-md-6 p-lg-4">
              <Card title={job.title}>
                <p><strong>Company:</strong> {job.company}</p>
                <p>Location: {job.location.city}, {job.location.state}, {job.location.country}</p>
                <p>Posted Date: {new Date(job.postedDate).toLocaleDateString()}</p>
                {/* Display truncated job overview */}
                <div
                  className={expandedJobIds.includes(job.id) ? 'expanded' : 'collapsed'}
                  dangerouslySetInnerHTML={{
                    __html: expandedJobIds.includes(job.id)
                      ? extractJobOverview(job.description)
                      : extractJobOverview(job.description).substring(0, 150) + '...'
                  }}
                />
                {extractJobOverview(job.description) && (
                  <div style={{ marginBottom: '1rem' }}>
                    <Button
                      label={expandedJobIds.includes(job.id) ? 'Show Less' : 'Show More'}
                      className="p-button-text"
                      onClick={() => toggleJobExpansion(job.id)}
                    />
                  </div>
                )}
                {/* Display buttons next to each other with a little space */}
                <div style={{ display: 'flex' }}>
                  <Button
                    label="Apply"
                    className="p-button-success shadow-button"
                    style={{ marginRight: '0.5rem' }}
                    onClick={() => window.open(job.applyUrl, '_blank')}
                  />
                  <Button
                    label="View"
                    className="p-button-secondary shadow-button"
                    onClick={() => window.open(job.hostedUrl, '_blank')}
                  />
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobListings;