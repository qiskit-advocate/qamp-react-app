import './App.scss';
import { useEffect, useState } from 'react';
import { Octokit } from 'octokit';

import { Header, HeaderName,} from "carbon-components-react/lib/components/UIShell";
import { Accordion, AccordionItem, Tabs, Tab } from 'carbon-components-react'
import ReactMarkdown from 'react-markdown'

const octokit = new Octokit();

function App() {
  const [ S21issues, setS21Issues ] = useState([]);
  const [ F21issues, setF21Issues ] = useState([]);

  useEffect(() => {
    async function getIssues(repoName) {
      const response = await octokit.request(`GET /repos/qiskit-advocate/${repoName}/issues`, {
        per_page: 100,
        sort: 'created',
        direction: 'asc'
      })
      return response
    }

    // get all issues from qamp-fall-21 repo
    getIssues('qamp-fall-21').then(res => {
      // filter out pull requests
      const justIssues = res.data.filter(issue => !issue.pull_request)
      console.log(justIssues)
      setF21Issues(justIssues)
    })

    // get all issues from qamp-spring-21 repo
    getIssues('qamp-spring-21').then(res => {
      // filter out pull requests
      const justIssues = res.data.filter(issue => !issue.pull_request)
      console.log(justIssues)
      setS21Issues(justIssues)
    })
    
  }, [])

  return (
    <div className="App">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="IBM">
          Qiskit Advocate Mentorship Program (QAMP)
        </HeaderName>
      </Header>
      <div style={{margin: "10px", marginTop: "50px"}}>
        <h1 style={{paddingTop: "20px"}}>Qiskit Advocate Mentorship Program</h1>
        <h1 style={{paddingBottom: "20px"}}>Project Summary</h1>
        <p>Here you can see details of past and ongoing mentorship porjects</p>
        <Tabs>
          <Tab id="tab-1" label="Fall 2021">
            <Accordion>
              {F21issues.map(issue => {
                return <AccordionItem title={`#${issue.number} ${issue.title}`}>
                  <h3>{issue.title}</h3>
                  <ReactMarkdown className="markDownElem">{issue.body}</ReactMarkdown>
                </AccordionItem>
              })}
            </Accordion>
          </Tab>
          <Tab id="tab-2" label="Spring 2021">
            <Accordion>
              {S21issues.map(issue => {
                return <AccordionItem title={`#${issue.number} ${issue.title}`}>
                  <h3>{issue.title}</h3>
                  <ReactMarkdown className="markDownElem">{issue.body}</ReactMarkdown>
                </AccordionItem>
              })}
            </Accordion>
          </Tab>
        </Tabs>
      </div>
      
    </div>
  );
}

export default App;
