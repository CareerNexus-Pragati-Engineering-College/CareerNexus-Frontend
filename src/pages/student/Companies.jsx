
const companiesData = [
  {
  id: "1",
  name: "Google",
  description:
    "Google is a multinational technology company specializing in Internet services and products, including search engines, cloud computing, and AI.",
  logo: "/images/google.png",
  jobDetails:
    "Role: Software Engineer\nLocation: Bangalore\nSalary: 18 LPA\nSkills: Data Structures, Algorithms, Problem Solving\n",
  experiences: [
    {
      id: 1,
      title: "Priya Sharma",
      details:
        "Priya faced a rigorous 5-round interview process. The first round focused on graph traversal algorithms, where she was asked to implement BFS and optimize the space and time complexity. The interviewer then shifted to a dynamic programming question, specifically on the 'longest palindromic subsequence'. Priya explained her thought process clearly and wrote clean pseudocode. In the system design round, she was given the problem of designing a scalable Gmail architecture. She discussed topics like load balancing with reverse proxies, sharded databases for email metadata, eventual consistency with distributed data centers, and caching strategies using Redis. The interviewer appreciated her structured answers, whiteboard sketches, and trade-off analysis. Finally, in the behavioral interview, she was asked about her past teamwork and conflicts at work, where she described how she navigated a tight deadline successfully by delegation and proactive communication."
    },
    {
      id: 2,
      title: "Amit Kumar",
      details:
        "Amit had four technical rounds and one behavioral round. The first round started with distributed systems fundamentals — he was asked to explain the CAP theorem and its relevance. Later, the interviewer gave him a rate-limiter design problem: Amit proposed a token-bucket algorithm with Redis as the data store and discussed implementation details like expiry keys and atomic operations. The next round dug into NoSQL sharding; Amit sketched MongoDB sharded clusters and explained how to prevent hotspots with compound keys. In the coding round, he was challenged to write a consistent hashing algorithm in under 30 minutes, which he successfully completed after some debugging. Finally, in the HR round, they asked questions like: 'Why do you want to work at Google?' and 'Describe a difficult team situation and your role in resolving it.' Amit answered with examples of leading a critical feature rollout and mentoring junior team members."
    },
    {
      id: 3,
      title: "Sunita Rajan",
      details:
        "Sunita had a specialized front-end interview experience spanning three rounds. The first round tested her understanding of the virtual DOM and React's reconciliation process; she explained the difference between controlled and uncontrolled components and wrote a custom `useDebounce` hook live. In the UI challenge, she had to build a responsive search UI with proper accessibility features — focus states, ARIA roles, keyboard navigation — under a strict timer. The interviewer then quizzed her on CSS animations and asked her to write Tailwind classes for smooth hover effects. The final round included performance optimizations where she discussed `useCallback`, `useMemo`, lazy loading routes, and code splitting with webpack. Sunita also faced questions like 'How would you make a complex UI accessible to screen readers?' and was praised for her thoughtful, user-centered answers."
    },
    {
      id: 4,
      title: "Vikram Patil",
      details:
        "Vikram's SRE interview spanned hands-on Linux debugging and theory. Initially, they simulated a high-CPU process and asked Vikram to identify the culprit using `top`, `ps`, and `strace`. Once the issue was located, they asked him to write a bash script that monitored the process and restarted it if its CPU usage crossed 90%. The discussion then shifted to SLOs and SLAs — Vikram had to explain how he'd craft realistic service level objectives for Gmail's uptime. Another interviewer asked him to design a logging architecture for millions of daily log entries using Kafka and ELK, discussing index rotation and retention policies. Finally, they assessed his knowledge of incident response by role-playing a pager alert: Vikram calmly described triaging steps, status page updates, and post-mortem analysis. The last HR round included questions like 'Explain a time you failed and what you learned,' where Vikram shared a story about a failed rollback plan and the process improvements he put in place afterward."
    },
    {
      id: 5,
      title: "Ananya Nair",
      details:
        "Ananya's interview was a deep dive into machine learning engineering. First, she had to tackle a whiteboard challenge to engineer features for a highly imbalanced fraud detection dataset; she discussed SMOTE, stratified sampling, and precision-recall optimization. The next part was a system design interview where Ananya outlined the architecture of a model training pipeline using Kubeflow — she covered continuous model versioning with DVC, using Kubernetes for scaling training jobs, and serving the final model with TensorFlow Serving. The interviewer then posed a practical coding task to implement a confusion matrix calculator and explain the math behind F1-scores. Finally, she discussed MLOps best practices like drift detection, data versioning, CI/CD automation for retraining, and rollback strategies. Ananya's last interview was behavioral, focused on leadership questions like 'How did you convince a reluctant team member to follow your technical direction?' and 'Describe a time you learned from feedback.' Her concrete stories and collaborative style left a strong impression."
    }
  ]
},


  {
  id: "2",
  name: "Microsoft",
  description:
    "Microsoft is an American technology company known for its software, hardware, and cloud platform Azure.",
  logo: "/images/microsoft.png",
  jobDetails:
    "Role: Full-Stack Developer\nLocation: Hyderabad\nSalary: 16 LPA\nSkills: React, Node.js, SQL, Azure\n",
  experiences: [
    {
      id: 1,
      title: "Rahul Desai",
      details:
        "Rahul had a multi-round interview focusing on both frontend and backend expertise. The first round involved creating a full-stack app live using Node.js and React, where he implemented login/signup features with JWT authentication and explained the trade-offs of JWT vs server sessions for scalability. The interviewer also dug into his knowledge of SQL query optimization — Rahul wrote a complex JOIN with proper indexes and discussed how to minimize query execution time. Finally, they asked about hosting the app on Azure App Service and leveraging Azure Monitor for real-time logs. In the behavioral round, Rahul discussed his teamwork and problem-solving skills, sharing an example of successfully delivering a project under a tight deadline by splitting the work with his teammates."
    },
    {
      id: 2,
      title: "Kavya Singh",
      details:
        "Kavya's interview was Azure-heavy with deep-dive into cloud architecture. The first technical round asked her to design ARM templates for deploying a scalable application — she wrote a simple ARM template to provision a VM scale set and explained its parameters and outputs. In the next round, they focused on auto-scaling rules for handling spiky traffic and she discussed CPU-based and request-based scaling. Interviewers also quizzed her on Application Insights, log query language (Kusto), and how to set up actionable alerts. Finally, they gave a scenario about deploying a React frontend on Azure Static Web Apps with a serverless backend and asked her to describe the deployment process and potential security pitfalls. Kavya also faced behavioral questions like 'Describe a time you automated a manual process and its impact' — she shared a story of automating builds using Azure Pipelines that saved her team several hours weekly."
    },
    {
      id: 3,
      title: "Vivek Pandey",
      details:
        "Vivek's interview revolved around data engineering and cloud ETL workflows. The first interviewer gave him a task to write a Python script to extract CSV data, transform it with pandas, and load it into an Azure SQL database. Then, they discussed partitioning data lakes — Vivek explained different partition strategies and how to optimize read performance with Parquet files. The next question was on Slowly Changing Dimensions (SCD) — he detailed SCD Type 1 vs Type 2 and wrote pseudo-SQL to implement SCD2. In the SQL round, Vivek showed off window functions and common table expressions (CTEs) to reduce subqueries. Finally, they discussed general Azure best practices for data security like TDE and managed identities. The behavioral segment focused on Vivek's collaboration style, where he recounted a time he mentored junior data analysts and standardized their ETL scripts."
    },
    {
      id: 4,
      title: "Isha Rao",
      details:
        "Isha's interview experience centered around frontend engineering. The interviewer first asked her to implement a responsive modal component in plain HTML and Tailwind CSS, then enhance it with accessibility features like `aria-labelledby` and focus-trap behavior — she demonstrated an understanding of inclusive design. The next part focused on webpack bundling optimization: Isha explained tree-shaking, code splitting, and lazy loading. She also tackled questions on browser compatibility and polyfills, where she noted the importance of Babel and PostCSS for legacy browsers. Finally, she was asked to describe performance optimization techniques like using the `useMemo` and `useCallback` hooks to minimize unnecessary renders. The HR discussion that followed was very collaborative, where she was asked about handling stakeholder feedback and iterating on design under tight deadlines — Isha gave an example of incorporating feedback on UI/UX tweaks that significantly improved user retention."
    },
    {
      id: 5,
      title: "Sandeep Reddy",
      details:
        "Sandeep's interview was very system-level and concurrency-focused. The first technical round was on debugging a deadlocked multithreaded program — Sandeep had to identify the cause using thread dumps and proposed using `synchronized` blocks with timeouts as a workaround. The next problem involved distributed systems design, where Sandeep was asked to design failover mechanisms for a highly available service — he outlined using heartbeats, leader election, and client-side retries. A follow-up question had him write unit tests simulating node failure and checking proper service recovery. The last technical session involved Azure-specific fault tolerance: Sandeep talked about deployment slots, rollback strategies, and blue-green deployment. Finally, they asked him a behavioral question about conflict resolution in teams. Sandeep shared a story of resolving a disagreement on architecture choices by encouraging team-wide consensus through data-driven performance tests."
    }
  ]
},

  {
  id: "3",
  name: "Amazon",
  description:
    "Amazon is an American multinational company focusing on e-commerce, cloud computing (AWS), and AI-powered consumer electronics.",
  logo: "/images/amazon.png",
  jobDetails:
    "Role: Cloud Engineer\nLocation: Chennai\nSalary: 20 LPA\nSkills: AWS, Kubernetes, Microservices\n",
  experiences: [
    {
      id: 1,
      title: "Megha Shah",
      details:
        "Megha's interview focused heavily on AWS networking and Kubernetes. In the first round, they asked her to design a VPC architecture — she described using public and private subnets, internet/NAT gateways, security groups, and NACLs to isolate services. They then moved into autoscaling EC2 groups, where Megha explained lifecycle hooks and dynamic scaling policies. The next round tested container knowledge — she built a Kubernetes deployment YAML with health checks and an autoscaling policy. Discussion followed on CloudWatch metrics, log retention, and using custom metrics. Finally, they asked for a practical architecture with SQS decoupling and ECS Fargate — Megha drew out the architecture and explained exactly where the queues and consumers fit. She also tackled a few behavioral questions about teamwork and handling production incidents calmly."
    },
    {
      id: 2,
      title: "Rajat Mehta",
      details:
        "Rajat's interview was very data-focused. The first round covered building an AWS Glue-based ETL pipeline — they gave him a raw schema and asked him to write a Glue job in PySpark to transform it, then register it in the Glue Data Catalog. He discussed schema evolution and schema versioning strategies, explaining techniques like adding new columns with backward compatibility. The interviewer then deep-dived into Athena queries and columnar formats — Rajat explained the trade-offs between CSV and Parquet and wrote example Athena queries to optimize partition pruning. They also asked him to reason about the cost of S3 queries and caching with Glue DataBrew. Finally, a system design question on a real-time streaming ingestion using Kinesis, Lambda, and DynamoDB capped the interview — Rajat walked them through error handling, at-least-once semantics, and dead-letter queues."
    },
    {
      id: 3,
      title: "Neha Iyer",
      details:
        "Neha's interview was microservice-heavy. The first round involved designing a checkout service for an e-commerce platform — she wrote pseudocode for a Java Spring Boot microservice that processes orders, integrates with SQS to decouple downstream inventory updates, and uses X-Ray for distributed tracing. Discussion moved to rate limiting — Neha proposed a Redis-based token bucket algorithm — and then fault tolerance, where she mentioned circuit breakers and retries. Another question was on monitoring using CloudWatch and custom CloudWatch metrics. In the final round, they asked a behavioral question about a time she handled an on-call incident under pressure; Neha gave a concrete example of a 3 AM pager-duty alert and the debug process she followed to resolve it."
    },
    {
      id: 4,
      title: "Tarun Nair",
      details:
        "Tarun's interview was frontend and performance-oriented. In the first coding round, he was given a Next.js page for product listings and had to implement SSR with caching and incremental static regeneration. He discussed Core Web Vitals — Largest Contentful Paint (LCP) and First Input Delay (FID) — and demoed lazy loading of images and code splitting with dynamic imports. Another interviewer quizzed him on image optimization strategies, such as using WebP and responsive `srcset`. Tarun also had to explain caching strategies with CloudFront and Cloudflare Workers. Finally, they asked him to describe an incident where a client-side bug caused a drop in conversions — he told a story about analyzing browser logs and fixing a race condition affecting the checkout button. The HR interview focused on Tarun's past teamwork experiences and his preferred working style."
    },
    {
      id: 5,
      title: "Anika Joshi",
      details:
        "Anika's interview centered around DevOps and SRE practices. The first round tested her understanding of CloudFormation scripting — she wrote a YAML snippet to provision an EC2 Auto Scaling group with rolling updates and explained how to parameterize the template. They followed up with questions about blue-green and canary deployments and she described tools like AWS CodeDeploy and rollback mechanisms. Next, Anika tackled chaos engineering — she walked them through simulating EC2 termination with the AWS Fault Injection Simulator and described how she’d monitor SLOs during chaos tests. The final round was a discussion on incident response, where she talked about designing runbooks, setting up a PagerDuty rotation, and implementing post-incident review processes to improve team preparedness. Throughout the interview, she was also asked soft-skill questions like resolving conflicts and mentoring junior engineers."
    }
  ]
},

  {
  id: "4",
  name: "Infosys",
  description:
    "Infosys is a global leader in IT consulting and services, delivering digital transformation for businesses worldwide.",
  logo: "/images/infosys.png",
  jobDetails:
    "Role: Software Trainee\nLocation: Pune\nSalary: 4.5 LPA\nSkills: Java, Spring Boot, SQL\n",
  experiences: [
    {
      id: 1,
      title: "Sneha Patel",
      details:
        "Sneha's interview began with core Java concepts like abstraction, encapsulation, and exception handling. She was then given a hands-on task to implement a Spring Boot REST microservice. Throughout this, she demonstrated dependency injection, use of Spring Data JPA for repository layer, and built a controller exposing GET and POST endpoints. The interviewer then delved into unit testing — Sneha wrote tests using JUnit and explained mocking with Mockito. Finally, they discussed deployment of Spring Boot apps as fat jars and basic concepts of microservice logging."
    },
    {
      id: 2,
      title: "Arjun Sharma",
      details:
        "Arjun’s interview focused on advanced Java concepts. He was quizzed on multithreading, synchronization, and deadlocks — Arjun wrote pseudocode demonstrating thread-safe Singleton patterns and synchronized blocks. They also asked him to solve a coding challenge around producer-consumer with wait/notify. Later, Arjun discussed Java 8 features like Streams and lambda expressions, then wrapped up by reviewing thread pools and concurrent collections. The interviewer concluded with design patterns like Factory and Observer and how he would apply them in a banking application."
    },
    {
      id: 3,
      title: "Tina Roy",
      details:
        "Tina's interview was all about SQL and troubleshooting. Given a slow-running query with deadlocks, Tina explained her step-by-step process for analyzing the execution plan and using indexes to optimize performance. The interviewer asked about transaction isolation levels and Tina elaborated on deadlock causes and prevention strategies. She also discussed error logging, log rotation policies, and simulated a real-world issue of insufficient disk space on a Linux box — sharing practical commands like `df -h` and using `logrotate` scripts. Finally, Tina talked about basic error handling and graceful service degradation."
    },
    {
      id: 4,
      title: "Karan Malik",
      details:
        "Karan's interview focused on front-end basics. They gave him a task to build a responsive product card using semantic HTML and CSS. Karan explained his mobile-first CSS strategy and demonstrated accessibility best practices like using `alt` attributes and ARIA roles. The interviewer then challenged him to add a hover effect with CSS transitions and optimize the design for different screen sizes. They also discussed cross-browser compatibility, testing layouts in Chrome and Firefox dev tools, and using CSS grid and flexbox for responsive design."
    },
    {
      id: 5,
      title: "Deepa Iyer",
      details:
        "Deepa's interview was Spring Security-centric. First, she walked the interviewer through setting up OAuth2 authorization and resource servers in a Spring Boot app. She explained JWT flow, scope-based authorization, and creating custom filters for request validation. The interviewer asked her to debug a 401 issue — Deepa checked the Spring security filter chain and explained her thought process clearly. They also discussed validation with Bean Validation (JSR-303), error handling with ControllerAdvice, and finally touched upon testing security endpoints with MockMvc."
    }
  ]
},
{
  id: "5",
  name: "TCS",
  description:
    "TCS is an Indian multinational IT and consulting company delivering IT and business solutions across domains.",
  logo: "/images/tcs.png",
  jobDetails:
    "Role: IT Analyst\nLocation: Mumbai\nSalary: 6.5 LPA\nSkills: Networking, ITIL\n",
  experiences: [
    {
      id: 1,
      title: "Karthik Joshi",
      details:
        "Karthik's interview was centered on IT fundamentals. The interviewer quizzed him on IP addressing — Karthik calculated subnets and explained CIDR notation. They moved on to DHCP/DNS workflows where Karthik walked through client-server handshakes. Finally, the interviewer covered ITIL processes, where Karthik described incident, problem, and change management in detail, with examples of severity levels, SLAs, and escalation procedures."
    },
    {
      id: 2,
      title: "Pooja Ramesh",
      details:
        "Pooja's interview simulated a support role. They gave her log files with errors like `service unavailable` and asked her to troubleshoot them — Pooja checked systemctl status, restarted failed services on a Unix VM, and explained graceful recovery options. Discussion then moved to SLAs and KPIs — Pooja defined metrics like first response time and resolution time, and explained escalation paths if KPIs weren't met. Finally, she gave a quick demo of writing a bash script to monitor log file growth using `tail -f` and cron jobs."
    },
    {
      id: 3,
      title: "Ankit Verma",
      details:
        "Ankit’s interview had a practical coding test where he created a PHP/MySQL signup form with validation and SQL queries. The interviewer pressed on security — Ankit demonstrated prevention of SQL injection with prepared statements, discussed session handling and CSRF tokens, and also explained basic cookie vs session differences. They closed with questions about error handling and sending error logs to a central monitoring system."
    },
    {
      id: 4,
      title: "Smita Rao",
      details:
        "Smita's interview targeted her experience as a business analyst. The interviewer asked her to explain user story writing — Smita wrote a sample story with acceptance criteria and discussed backlog grooming using tools like JIRA. They also discussed requirements traceability, elicitation techniques (workshops, interviews), and story-point estimation methods. Finally, Smita outlined how she would manage scope changes mid-sprint using proper change control processes."
    },
    {
      id: 5,
      title: "Suresh Nair",
      details:
        "Suresh was tested on his software testing expertise. Given a sample login page, he wrote functional test cases and walked the interviewer through equivalence partitioning and boundary value analysis. Discussion covered regression and smoke testing strategies — Suresh explained creating a regression suite in Selenium and generating HTML reports. They also asked him to differentiate black-box and white-box testing and describe his defect management process using tools like Bugzilla or JIRA."
    }
  ]
},

  {
  id: "6",
  name: "Wipro",
  description:
    "Wipro is a leading Indian IT company providing business process and IT services globally.",
  logo: "/images/wipro.png",
  jobDetails:
    "Role: Associate Engineer\nLocation: Bangalore\nSalary: 5 LPA\nSkills: C++, OS concepts\n",
  experiences: [
    {
      id: 1,
      title: "Mithun Sahu",
      details:
        "Mithun's interview began with deep questions on C++ fundamentals — STL containers, virtual vs pure virtual functions, and smart pointers. Then they asked him to implement a thread-safe queue using mutexes and condition variables. The interviewer also quizzed him on OS concepts like process vs thread management, memory allocation strategies, and deadlocks. Mithun explained his approach clearly and wrote working code during the live session."
    },
    {
      id: 2,
      title: "Gayatri Deshpande",
      details:
        "Gayatri's interview focused on front-end basics. She built a responsive navbar using CSS flexbox/grid and handled different breakpoints. They discussed accessibility features like semantic HTML tags, using aria-labels and keyboard-friendly menus. The interviewer then asked her about media queries, cross-browser compatibility, and creating light/dark themes. Gayatri explained her solutions and demonstrated her knowledge of web standards."
    },
    {
      id: 3,
      title: "Pranav Sinha",
      details:
        "Pranav was asked to build a small REST API with Spring Boot. The interviewer emphasized request validation with @Valid and Bean validation, then discussed JSON serialization using Jackson. They also asked about Spring security — Pranav demonstrated using OAuth2 and explained the difference between role-based and authority-based authorization. Finally, they talked about error handling using @ControllerAdvice and writing unit tests for the service layer."
    },
    {
      id: 4,
      title: "Ruchi Patel",
      details:
        "Ruchi faced a cloud-focused interview. The interviewer gave a brief architecture with Azure VMs and containerized apps and asked her to design scaling strategies. Ruchi discussed configuring VM scale sets, implementing basic Azure security best practices with NSGs and service principals, and logging errors with Application Insights. They also asked her about container orchestration with Docker Compose and Kubernetes basics, and Ruchi answered confidently with real-world examples."
    },
    {
      id: 5,
      title: "Aditya Joshi",
      details:
        "Aditya's interview centered on CI/CD pipeline design. He was given a Jenkinsfile and asked to add declarative stages for build, test, and deploy. Aditya discussed rollback strategies, handling failed deployments, and using environment-specific variables. They also quizzed him on writing Groovy scripts inside Jenkinsfiles, triggered builds with webhooks, and using Git hooks. Finally, Aditya explained artifact versioning and integration testing before deployment."
    }
  ]
},
{
  id: "7",
  name: "Accenture",
  description:
    "Accenture is a global IT consulting firm delivering IT and technology solutions across all major industries.",
  logo: "/images/accenture.png",
  jobDetails:
    "Role: Application Developer\nLocation: Noida\nSalary: 7 LPA\nSkills: Java, SQL, Debugging\n",
  experiences: [
    {
      id: 1,
      title: "Priyanshu Dubey",
      details:
        "Priyanshu's interview focused on JVM internals — he explained heap vs stack allocation, garbage collection algorithms (G1, CMS), and how to debug deadlocks using thread dumps. The interviewer also discussed multithreaded concurrency and asked him to implement a producer-consumer pattern. Priyanshu confidently wrote synchronized blocks, discussed thread-safe collections like ConcurrentHashMap, and walked through examples of thread states and lock contention."
    },
    {
      id: 2,
      title: "Vishal Thakur",
      details:
        "Vishal was asked to design a small RESTful service. The interviewer focused on HTTP status codes, idempotent PUT vs POST, and REST best practices. Vishal then wrote SQL queries on the spot — joins, group-by, and subqueries. The discussion moved to SQL optimization (indexes and explain plans) and best practices around foreign keys and normalization. Vishal also explained basic caching techniques for read-heavy workloads."
    },
    {
      id: 3,
      title: "Nitya Kumar",
      details:
        "Nitya's interview was full-stack focused — she built a simple login page with React for the front end and an Express.js server for authentication. They quizzed her on protecting against CSRF and XSS and how to properly hash passwords with bcrypt. Discussion covered JWT session handling, cookie security flags, and protecting sensitive data with environment variables. Nitya also explained error handling and validation logic thoroughly."
    },
    {
      id: 4,
      title: "Meenakshi Rao",
      details:
        "Meenakshi's interview focused on AWS basics. She was asked about EC2 types, IAM roles, and auto-scaling groups. They discussed using S3 for file storage and setting up CloudWatch to monitor application health. The interviewer also posed a question about handling secret credentials and secrets manager, and Meenakshi outlined best practices for security groups and VPC subnets."
    },
    {
      id: 5,
      title: "Anuj Sharma",
      details:
        "Anuj was tested on test automation. Given a login page, he wrote Selenium WebDriver scripts and explained locating elements with XPath and CSS selectors. They also asked about writing assertions with JUnit and generating reports with Allure. Anuj discussed CI integration for automated tests and shared ideas for handling dynamic elements and data-driven testing to improve maintainability and reliability of tests."
    }
  ]
},

  {
  id: "8",
  name: "HCL",
  description:
    "HCL Technologies is an Indian multinational IT company delivering engineering and digital solutions globally.",
  logo: "/images/hcl.png",
  jobDetails:
    "Role: Support Engineer\nLocation: Chennai\nSalary: 3.8 LPA\nSkills: Networking, Linux\n",
  experiences: [
    {
      id: 1,
      title: "Kavita Rao",
      details:
        "Kavita's interview started with hands-on Linux command tests — she was asked to search large log files using grep, filter processes using ps and top, and change file permissions with chmod and chown. The interviewer gave her a simulated issue where permissions were incorrect on an application directory and had her walk through the debugging process. They also quizzed her on symbolic vs numeric permissions, soft vs hard links, and basic shell scripting. Kavita was also asked to explain the Linux boot process and common commands to troubleshoot a failing service."
    },
    {
      id: 2,
      title: "Harish Patel",
      details:
        "Harish was tested on his understanding of DevOps fundamentals — the interview gave him a task to draft a Jenkins pipeline for a simple Java microservice deployment. The discussion covered writing declarative pipeline scripts, using environment variables, and deploying to a staging environment. The interviewer also went into containerization basics and asked him to describe how he’d package the app into a Docker image and publish it to a container registry."
    },
    {
      id: 3,
      title: "Simran Sethi",
      details:
        "Simran’s interview was networking-heavy. The interviewer began with basics — she was asked to draw the TCP three-way handshake and explain the roles of SYN, SYN-ACK, and ACK. They then moved to ARP and DHCP processes and had her explain what happens when a client first joins a network. Simran also discussed IP addressing, subnets, and created a sample subnetting plan. Finally, she explained VPNs, including concepts like tunneling and encryption."
    },
    {
      id: 4,
      title: "Kiran Kumar",
      details:
        "Kiran was given a brief coding test where he built a simple RESTful API using Express.js to create and retrieve customer data. Discussion included handling CORS errors, processing JSON payloads with body-parsers, and setting up basic validation. Kiran was also asked to reason about error handling best practices and describe differences between PUT, PATCH, and POST methods for data updates."
    },
    {
      id: 5,
      title: "Manisha Rathi",
      details:
        "Manisha's interview focused on software testing fundamentals. She was asked to describe black-box vs white-box testing and list common testing tools. The interviewer gave her a simple login page and asked her to write Selenium scripts for automated UI testing and then demonstrate an API test using Postman. They also discussed generating test reports with tools like Allure and setting up a CI/CD pipeline that triggers test execution on every code push."
    }
  ]
},
{
  id: "9",
  name: "Tech Mahindra",
  description:
    "Tech Mahindra is an Indian IT company offering IT and consulting services to global clients across domains.",
  logo: "/images/techmahindra.png",
  jobDetails:
    "Role: IT Support\nLocation: Hyderabad\nSalary: 4 LPA\nSkills: Customer Support, ITSM tools\n",
  experiences: [
    {
      id: 1,
      title: "Ravi Bansal",
      details:
        "Ravi’s interview began with customer support scenarios — they asked him to describe how to use ServiceNow ITSM tools to track incident tickets, escalate priority 1 incidents, and log a new request. The interviewer also had him write basic SQL queries to filter tickets by status and date. They also discussed SLA breaches and communication etiquette with clients."
    },
    {
      id: 2,
      title: "Deepika Nair",
      details:
        "Deepika was quizzed on AWS fundamentals — setting up S3 buckets for backups, configuring IAM roles and policies for a web application, and writing a simple CloudFormation template to provision EC2 instances. She was also given a theoretical issue of incorrect permissions and had to troubleshoot access errors to an S3 bucket using CloudTrail logs."
    },
    {
      id: 3,
      title: "Pradeep Sharma",
      details:
        "Pradeep was tested on computer networks — the interviewer began with OSI layers and asked him to explain each layer's purpose. They discussed TCP vs UDP, and Pradeep drew the TCP handshake to illustrate connection establishment. Finally, they gave him a practical question about setting up a VLAN and configuring static routes between two subnets. He was also asked to explain common network troubleshooting commands like ping, traceroute, and nslookup."
    },
    {
      id: 4,
      title: "Seema Patel",
      details:
        "Seema was tested on her front-end skills — the interview required her to implement a responsive sign-in page using Tailwind CSS, demonstrating media query behavior on different screen sizes. They then shifted to async JS, asking about Promises and async/await error handling. Finally, they discussed accessibility enhancements like screen-reader-friendly elements and keyboard navigation."
    },
    {
      id: 5,
      title: "Mohit Jain",
      details:
        "Mohit was asked to design a login API with Express.js — he outlined the routing structure and showed how to hash passwords using bcrypt and issue JWT tokens on successful login. The interviewer also tested him on input validation and rate-limiting to prevent brute-force attacks. They concluded by discussing storing sessions securely and refreshing tokens to keep sessions alive."
    }
  ]
}


];
export default companiesData;