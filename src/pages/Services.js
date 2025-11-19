import React from 'react';
import Sidebar from '../components/Sidebar';
import contentData from '../data/content.json';

function Services() {
  return (
    <div className="page-container">
      <Sidebar 
        title="Our Work" 
        items={contentData.sidebarLinks.services.offerings}
      />
      <main className="fade-in">
        <h2>🛡️ Our Services</h2>
        
        <div className="content-row">
          {contentData.services.map((service) => (
            <div key={service.id} className="content-box">
              <h3>{service.icon} {service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="table-section" style={{ marginTop: '30px' }}>
          <h3>💰 Service Packages</h3>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Duration</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {contentData.servicePackages.map((pkg, index) => (
                <tr key={index}>
                  <td>{pkg.service}</td>
                  <td>{pkg.duration}</td>
                  <td><strong>{pkg.price}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="content-row" style={{ marginTop: '30px' }}>
          <div className="content-box">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>Experienced instructors with real-world expertise</li>
              <li>Hands-on, practical learning approach</li>
              <li>Industry-recognized certifications</li>
              <li>Flexible scheduling and online options</li>
              <li>Lifetime access to course materials</li>
            </ul>
          </div>
          <div className="content-box">
            <h3>Get Started</h3>
            <p>Ready to enhance your cybersecurity skills? Contact us today to discuss your training needs.</p>
            <p><strong>Email:</strong> services@cybersecure.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Services;
