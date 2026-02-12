const PORT = 7000;
const express = require("express");
const cors = require("cors");
const path = require("path");
const { facts } = require("./Public/Js/facts.js");
const sequilize = require("./Utils/SqlDb");
const CheckAuth = require("./Utils/CheckAuth.js");
const CheckUserAuth = require("./Utils/CheckUserAuth.js");
const User = require("./DataAccess/User");
const Event = require("./DataAccess/Event");
const UsersEventsMapping = require("./DataAccess/UsersEventsMapping");
const localStorage = require("./Utils/LocalStorage.js");
// const bodyParser = require('body-parser')
const geoip = require("geoip-lite");
const SendGroupMail = require("./Utils/SendGroupMail.js");
const { Sequelize } = require("sequelize");
const app = express();

const userEventRegistrations = [];
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));
app.use(cors({ methods: "GET,HEAD,PUT,PATCH,POST,DELETE", origin: "*" }));
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/location", async (req, res, next) => {
  const ipAddress = "182.76.158.166"; //req.ip;
  const geo = geoip.lookup(ipAddress);
  if (!geo) {
    return res.status(400).json({ error: "Invalid IP address" });
  }
  const location = {
    ip: ipAddress,
    city: geo.city,
    region: geo.region,
    country: geo.country,
    ll: geo.ll,
  };
  return res.json(location);
});
app.get("/AdminRegister", async (req, res, next) => {
  return res.render("Admin/AdminRegister", { title: "Admin Register" });
});
app.post("/AdminRegister", async (req, res, next) => {
  return res.redirect("AdminHome");
});

app.get("/AdminLogin", async (req, res, next) => {
  return res.render("Admin/AdminLogin", { title: "Admin Login" });
});
app.post("/AdminLogin", async (req, res, next) => {
  const { Email, Password } = req.body;
  localStorage.setItem("isLoggedIn", "true");
  return res.redirect("AdminHome");
});
app.post("/AdminLogout", async (req, res, next) => {
  const { Email, Password } = req.body;
  localStorage.removeItem("isLoggedIn");
  return res.redirect("AdminHome");
});
app.get("/AdminHome", CheckAuth, async (req, res, next) => {
  const events = await Event.findAll();
  return res.render("Admin/AdminHome", {
    title: "Admin Home",
    Events: events,
    adminLoggedIn: localStorage.getItem("isLoggedIn"),
  });
});
app.get("/UserLogin", (req, res, next) => {
  return res.status(200).render("User/UserLogin", {
    title: "User Login",
    PastData: {
      email: "",
      password: "",
    },
  });
});
app.post("/UserLogin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!(email && email.includes("@") && email.length > 5))
      return res.status(422).render("User/UserLogin", {
        title: "User Login",
        PastData: {
          errorMessage: "Please enter a valid Email",
          email,
          password,
        },
      });
    if (!(password && password.length > 7))
      return res.status(422).render("User/UserLogin", {
        title: "User Login",
        PastData: {
          errorMessage: `Please enter a valid Password`,
          email,
          password,
        },
      });
    const foundUser = await User.findOne({ where: { Email: email } });
    if (!foundUser)
      return res.status(404).render("User/UserLogin", {
        title: "User Sign In Form",
        PastData: {
          errorMessage: "No Such User Exists",
          email,
          password,
        },
      });
    localStorage.setItem("userLoggedIn", true);
    localStorage.setItem("userEmailAddress", email);
    return res.redirect("UserHome");
  } catch (err) {
    return res.status(400).render("/Error/error");
  }
});
app.get("/UserRegister", (req, res, next) => {
  return res.status(200).render("User/UserRegister", {
    title: "User Registration Form",
    PastData: {
      email: "",
      password: "",
    },
  });
});
app.post("/UserRegister", async (req, res, next) => {
  const {
    firstName,
    lastName,
    inputEmail,
    phoneNumber,
    inputPassword,
    inputAddress,
    inputAddress2,
    inputCity,
    inputZip,
    isSubscribed,
    inputState,
    isInterestedInSponsoring,
  } = req.body;
  interests = req.body["interests[]"];
  // if(firstName.length<3 || lastName.length<3)
  //     return res.status(422).render('/User/UserRegister',
  //     {
  //         title:"User Registration Form",
  //         PastData:
  //         {
  //             firstName,lastName,
  //             inputEmail,phoneNumber,
  //             password,inputAddress,
  //             inputAddress2,inputCity,
  //             inputZip,
  //             errorMessage:'Please Enter Valid First Name & Last Name'
  //         }
  //     })
  // else if(!(inputEmail.includes("@") && inputEmail.length>0))
  //     return res.status(422).render('/User/UserRegister',
  //     {
  //         title:"User Registration Form",
  //         PastData:
  //         {
  //             firstName,lastName,
  //             inputEmail,phoneNumber,
  //             password,inputAddress,
  //             inputAddress2,inputCity,
  //             inputZip,
  //             errorMessage:'Please Enter Valid Email Address'
  //         }
  //     })
  // else if(!(password && password.length>7))
  //     return res.status(422).render('/User/UserRegister',
  //     {
  //         title:"User Registration Form",
  //         PastData:
  //         {
  //             firstName,lastName,
  //             inputEmail,phoneNumber,
  //             password,inputAddress,
  //             inputAddress2,inputCity,
  //             inputZip,
  //             errorMessage:'Please Enter Valid Password'
  //         }
  //     })
  // else if(!phoneNumber)
  //     return res.status(422).render('/User/UserRegister',
  //     {
  //         title:"User Registration Form",
  //         PastData:
  //         {
  //             firstName,lastName,
  //             inputEmail,phoneNumber,
  //             password,inputAddress,
  //             inputAddress2,inputCity,
  //             inputZip,
  //             errorMessage:'Please Enter Valid Phone Number'
  //         }
  //     })
  // else if(!(inputAddress && inputAddress2))
  //     return res.status(422).render('/User/UserRegister',
  //     {
  //         title:"User Registration Form",
  //         PastData:
  //         {
  //             firstName,lastName,
  //             inputEmail,phoneNumber,
  //             password,inputAddress,
  //             inputAddress2,inputCity,
  //             inputZip,
  //             errorMessage:'Please Enter Valid Address Details'
  //         }
  //     })
  const createdUser = await User.create({
    FirstName: firstName,
    LastName: lastName,
    Email: inputEmail,
    PhoneNumber: phoneNumber,
    Password: inputPassword,
    Location: inputAddress + inputAddress2,
    City: inputCity,
    State: inputState,
    Zip: inputZip,
    isSubscribed: isSubscribed && isSubscribed === "on" ? true : false,
    Interest: interests && interests.length > 0 ? interests.join(";") : "",
    isRegistered: true,
    isInterestedInSponsoring:
      isInterestedInSponsoring && isInterestedInSponsoring === "on"
        ? true
        : false,
  });
  localStorage.setItem("userLoggedIn", true);
  localStorage.setItem("userEmailAddress", inputEmail);
  return res.redirect("UserHome");
});
app.get("/UserHome", CheckUserAuth, async (req, res, next) => {
  const userEmailAddress = localStorage.getItem("userEmailAddress");
  const user = await User.findOne({ where: { Email: userEmailAddress } });
  if (!user) return res.redirect("UserLogin");
  const events = await user.getEvents();
  upcomingEvents = events ? events.filter((c) => c.Status === "open") : [];
  pastEvents = events ? events.filter((c) => c.Status === "closed") : [];
  return res.render("./User/UserHome", {
    title: "User Home Page",
    upcomingEvents: upcomingEvents,
    pastEvents: pastEvents,
    userLoggedIn: localStorage.getItem("userLoggedIn"),
    userEmailAddress: localStorage.getItem("userEmailAddress"),
  });
});
app.post("/UserLogout", async (req, res, next) => {
  localStorage.removeItem("userEmailAddress");
  localStorage.removeItem("userLoggedIn");
  return res.redirect("UserHome");
});
// app.get("/UserHome",CheckAuth,async(req,res,next)=>
// {
//     const events = await User.findAll()
//     return res.render('User/UserHome',{title:'User Home Page',Events:events})
// })
app.post("/events/register", async (req, res, next) => {
  const {
    EventId,
    firstName,
    lastName,
    inputAddress,
    inputAddress2,
    inputEmail,
    inputState,
    phoneNumber,
    inputCity,
    inputZip,
    isSubscribed,
    interests,
  } = req.body;
  const userLoggedIn = localStorage.getItem("userLoggedIn");
  const event = await Event.findOne({ where: { EventId: EventId } });
  if (userLoggedIn) {
    const userEmailAddress = localStorage.getItem("userEmailAddress");
    const user = await User.findOne({ where: { Email: userEmailAddress } });
    let isUserRegistrationExisting =
      (await user.getEvents({ where: { EventId: EventId } })).length > 0;
    console.log(isUserRegistrationExisting);
    if (isUserRegistrationExisting)
      return res.status(222).json({
        message: `User ${user.FirstName} is already registered for the event:${event.Title} scheduled for <span class="text-danger">${event.EventDateTime}</span>`,
      });
    user.addEvent(event);
    return res.status(200).json({
      message: `User ${user.FirstName} registered sucessfully for the event:${event.Title} scheduled for <span class="text-danger">${event.EventDateTime}</span>`,
    });
  } else {
    if (
      (firstName && firstName.length < 3) ||
      (firstName && firstName.length < 3)
    )
      return res.status(422).json({
        message: "First/Last Name must be grater than 3 characters long",
      });
    else if (inputAddress && inputAddress.length === 0)
      return res.status(422).json({ message: "Address is required" });
    else if (inputEmail && !(inputEmail.includes("@") && inputEmail.length > 0))
      return res
        .status(422)
        .json({ message: "Please enter a valid email address" });
    else if (inputCity && !(inputCity.length > 0))
      return res.status(422).json({ message: "Please enter a valid City" });
    else if (inputZip && !(inputZip.length > 0))
      return res.status(422).json({ message: "Please enter a valid Zip Code" });
    if ((await event.getUsers({ where: { Email: inputEmail } })).length !== 0)
      //userEventRegistrations.find(c=>c.EventId===EventId && c.inputEmail===inputEmail)
      return res.status(222).json({
        message: `User ${firstName} is already registered for the event:${event.Title} scheduled for <span class="text-danger">${event.EventDateTime}</span>`,
      });
    else {
      //checking user
      const user = await User.findOne({ where: { Email: inputEmail } });
      if (user) {
        user.addEvent(event);
      } else {
        const newUser = await User.create({
          FirstName: firstName,
          LastName: lastName,
          Email: inputEmail,
          PhoneNumber: phoneNumber,
          Location: inputAddress + inputAddress2,
          City: inputCity,
          Zip: inputZip,
          State: inputState,
          isSubscribed: isSubscribed,
          Interests: interests,
          isRegistered: false,
        });
        newUser.addEvent(event);
      }
      return res.status(200).json({
        message: `User ${firstName} registered sucessfully for the event:${event.Title} scheduled for <span class="text-danger">${event.EventDateTime}</span>`,
      });
    }
  }
});

app.get("/events/:id", async (req, res, next) => {
  const getUsers = req.query.users;
  console.log("query", req.query);
  const event = await Event.findByPk(req.params.id);
  if (getUsers && +getUsers === 1) {
    const users = await event.getUsers();
    console.log("users", users);
    return res.status(200).json({ Event: event, Users: users });
  } else {
    return res.status(200).json(event);
  }
});
app.get("/events", async (req, res, next) => {
  const noOfRecords = req.query.noOfRecords;
  const city = req.query.city;
  const status = req.query.status;
  console.log(req.query);
  let availableEvents = await Event.findAll({
    where: { City: city, Status: status },
  });
  return res.status(200).json(availableEvents);
});
//create new event
app.post("/events", async (req, res, next) => {
  try {
    const {
      Title,
      Description,
      EventDateTime,
      MaxNoOfSeats,
      Location,
      City,
      State,
    } = req.body;
    if (
      Title &&
      Title.length > 0 &&
      Description &&
      Description.length > 0 &&
      EventDateTime &&
      EventDateTime.toString().length > 0 &&
      MaxNoOfSeats &&
      Location &&
      City &&
      State
    ) {
      let createdEvent = await Event.create({
        Title,
        Description,
        EventDateTime,
        MaxNoOfSeats,
        Location,
        City,
        State,
        Status: "open",
        NoOfParticipentsRegistered: 0,
      });
      console.log(createdEvent.EventId);
      //sending mail
      const DistinctUsersSubscribed = (
        await User.findAll({
          where: { isSubscribed: true },
          attributes: [
            [Sequelize.fn("DISTINCT", Sequelize.col("Email")), "Email"],
          ],
        })
      ).map((c) => c.Email);
      await SendGroupMail(
        DistinctUsersSubscribed,
        `You are Subscribed to the Event:${createdEvent.Title} Scheduled On:${createdEvent.EventDateTime}`,
        {
          Title: createdEvent.Title,
          Description: createdEvent.Description,
          EventDateTime: createdEvent.EventDateTime,
          MaxNoOfSeats: createdEvent.MaxNoOfSeats,
          Location: createdEvent.Location,
          City: createdEvent.City,
          State: createdEvent.State,
          Status: createdEvent.Status,
          NoOfParticipentsRegistered: createdEvent.NoOfParticipentsRegistered,
        }
      );
      return res.status(200).json({
        message: `Event:${createdEvent.Title} Created successfully`,
        Event: {
          EventId: createdEvent.EventId,
          Title,
          Description,
          EventDateTime,
          MaxNoOfSeats,
          Location,
          City,
          State,
          Status: createdEvent.Status,
          NoOfParticipentsRegistered: createdEvent.NoOfParticipentsRegistered,
        },
      });
    } else {
      return res.status(222).json({ message: "Please Pass a Valid Payload" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.msg });
  }
});
//edit event
app.put("/events", async (req, res, next) => {
  console.log("put request");
  try {
    const {
      EventId,
      Title,
      Description,
      EventDateTime,
      MaxNoOfSeats,
      Location,
      City,
      State,
    } = req.body;
    console.log({
      EventId,
      Title,
      Description,
      EventDateTime,
      MaxNoOfSeats,
      Location,
      City,
      State,
    });
    if (
      Title &&
      Title.length > 0 &&
      Description &&
      Description.length > 0 &&
      EventDateTime &&
      EventDateTime.toString().length > 0 &&
      MaxNoOfSeats &&
      Location &&
      City &&
      State
    ) {
      let fetchedEvent = await Event.findOne({ where: { EventId: EventId } });
      console.log(fetchedEvent.EventId);
      fetchedEvent.EventId = EventId;
      fetchedEvent.Title = Title;
      fetchedEvent.Description = Description;
      fetchedEvent.EventDateTime = EventDateTime;
      fetchedEvent.MaxNoOfSeats = MaxNoOfSeats;
      fetchedEvent.Location = Location;
      fetchedEvent.City = City;
      fetchedEvent.State = State;
      const updatedEvent = await fetchedEvent.save();
      return res.status(200).json({
        message: `Event:${updatedEvent.Title} Updated successfully`,
        Event: updatedEvent,
      });
    } else {
      return res.status(222).json({ message: "Please Pass a Valid Payload" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.msg });
  }
});
app.get("/test", (req, res, next) => {
  const quiz = [
    {
      question:
        "1. Which of the following is one of the secondary air pollutants among the following?",
      solutions: ["Ozone", "CO2", "CO", "PANs"],
      facts: [
        "Ground-level ozone is a secondary pollutant formed through chemical reactions between nitrogen oxides (NOx) and volatile organic compounds (VOCs). Ozone can irritate the eyes, nose and throat, aggravate lung diseases, or increase the risk of premature death in people with heart or lung disease.",
      ],
    },
  ];
  return res.status(200).json({
    question:
      "1. Which of the following is one of the secondary air pollutants among the following?",
    solutions: ["Ozone", "CO2", "CO", "PANs"],
    answer: "Ozone",
    answerIndex: 0,
  });
});
app.get("/facts/random", (req, res, next) => {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

  return res
    .status(200)
    .json(facts[getRandomIntInclusive(0, facts.length - 1)]);
});
app.get("/game", (req, res, next) => {
  return res.sendFile(path.join(__dirname, "Public", "HTML", "index.html"));
});
app.get("/communityHome", async (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get("host")}/location`;
  const response = await fetch(fullUrl);
  const locationDetails = await response.json();
  const upcomingEvents = await Event.findAll({
    where: { City: locationDetails.city, Status: "open" },
  });
  const pastEvents = await Event.findAll({
    where: { City: locationDetails.city, Status: "closed" },
  });
  const upcomingEventsCities = [
    ...new Set(
      [
        ...(await Event.findAll({
          where: { Status: "open" },
          attributes: ["City"],
        })),
      ].map((c) => c.City)
    ),
  ];
  const pastEventsCities = [
    ...new Set(
      [
        ...(await Event.findAll({
          where: { Status: "closed" },
          attributes: ["City"],
        })),
      ].map((c) => c.City)
    ),
  ];
  console.log(
    upcomingEvents.map((c) => {
      return { Title: c.Title, Categories: c.Categories };
    }),
    pastEventsCities
  );
  return res.render("./community/communityHome", {
    upcomingEvents: upcomingEvents,
    pastEvents: pastEvents,
    pastEventsCities: pastEventsCities,
    upcomingEventsCities: upcomingEventsCities,
    clientCity: locationDetails.city,
    userLoggedIn: localStorage.getItem("userLoggedIn"),
    userEmailAddress: localStorage.getItem("userEmailAddress"),
  });
});

app.get("/communityRegister", (req, res, next) => {
  return res.sendFile(
    path.join(__dirname, "Public", "HTML", "communityRegister.html")
  );
});
app.get("/communityLogin", (req, res, next) => {
  return res.sendFile(
    path.join(__dirname, "Public", "HTML", "communityLogin.html")
  );
});
app.get("/", (req, res, next) => {
  return res.sendFile(path.join(__dirname, "Public", "HTML", "main.html"));
});

app.listen(PORT, async () => {
  try {
    User.belongsToMany(Event, { through: UsersEventsMapping });
    Event.belongsToMany(User, { through: UsersEventsMapping });
    // Event.hasMany(User)
    // User.hasMany(Event)

    await sequilize.sync({ force: false });
    await Event.bulkCreate([
      {
        Title: "Local park Service",
        Description:
          "volunteer to help clean up your local parks. Getting rid of litter, as well as uprooting any invasive plants, will help make your community — and your environment as a whole — a little better. volunteers split into groups, dividing the park into sections to finish the cleanup more quickly. A few tasks can involve Picking up litter, Sorting trash and recycling, Removing invasive weeds and vines and Adding mulch or plants to a section of the park.",
        EventDateTime: "15 April 2023",
        MaxNoOfSeats: "100",
        NoOfParticipentsRegistered: "89",
        City: "Visakhapatnam",
        Location: "Road No 2, HM Colony,Jagadamba Centre",
        State: "Andhra Pradesh",
        Status: "closed",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },

      {
        Title: "Volunteer at an Animal shelter",
        Description:
          "Collect donations for the local animal shelter.Every shelter has different needs. Check with the animal shelter staff as what their specific needs are. Have a veterinarian or veterinary student demonstrate pet care and pet safety. Children can use stuffed animal pets to practice the skills hands-on. Volunteer in a Dog Wash fundraiser for a local shelter. Attendees have the option of making a donation of shelter dog supplies in lieu of a dog wash.",
        EventDateTime: " 9 March 2023",
        MaxNoOfSeats: "100",
        NoOfParticipentsRegistered: "9",
        City: "Hyderabad",
        Location: "IT Synergy Park,Hitech City",
        State: "Telangana",
        Status: "open",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },

      {
        Title: "Pick up litter from local beach",
        Description:
          "The beaches are some of our earths prized possessions. We should all do our part to take care of them.Stay Organized - After meeting up with everyone at the cleanup site, split up the area and have everyone break off into smaller groups to work together. Plan a place where full trash bags can go, so they are not scattered all over. Remove Trash - Time to clean up! Use music to keep everyone motivated while you do your good deed for the environment.Haul Trash - Do not leave all that bagged up garbage there! Make sure you have a place to dump all of the trash safely. If there is the option to recycle, you could even separate trash and recycling to lessen the landfill load.",
        EventDateTime: "25 April 2023",
        MaxNoOfSeats: "200",
        NoOfParticipentsRegistered: "75",
        City: "Visakhapatnam",
        Location: "Gate 3, RK Beach",
        State: "Andhra Pradesh",
        Status: "open",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },

      {
        Title: "School Recylcing Programme",
        Description:
          "Recycling is an important concern to be brought to the attention of all of the younger generation.It is important to teach students why they should reduce, reuse, recycle. A hands-on activity that shows how different kinds of materials decompose will help bring the concept to life.Introduce concepts about how organic materials decompose.Have students make a list of all the appliances and light bulbs in their house. Recycled materials can make beautiful art projects such as jewelry, planters, and bird houses.",
        EventDateTime: "30 April 2023",
        MaxNoOfSeats: "100",
        NoOfParticipentsRegistered: "23",
        City: "Hyderabad",
        Location: "DAV Public School,Jublie Hills ",
        State: "Telangana",
        Status: "open",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },

      {
        Title: "Community Tree Planting event",
        Description:
          "Community Tree Plant events bring together families, community members and volunteers to take part in a half-day tree planting activity, promoting local engagement and environmental awareness. Community volunteers improve our local environment by planting trees, shrubs and wildflowers; cleaning up streams and removing invasive plants from our parks and natural areas.",
        EventDateTime: "5 May 2023",
        MaxNoOfSeats: "220",
        NoOfParticipentsRegistered: "36",
        City: "Visakhapatnam",
        Location: "Indira Gandhi Zoological Park",
        State: "Andhra Pradesh",
        Status: "open",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },

      {
        Title: "Earth Day Event",
        Description:
          "Earth Day has grown into an internationally celebrated event in more than 200 countries across the globe. It’s the perfect time to remember to appreciate Earth and commit to making changes big and small to protect it. Some of the activities include understanding Local Environmental Issues, Planning Educational Presentations, Organizing a Community Hike with a Nature Expert, Building a Community Garden, Installing Solar Panels, Joining a Green Committee,Plant Trees in Community Areas. ",
        EventDateTime: "22 April 2023",
        MaxNoOfSeats: "1000",
        NoOfParticipentsRegistered: "990",
        City: "Hyderabad",
        Location: "LB Stadium",
        State: "Telangana",
        Status: "closed",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },

      {
        Title: "Wild Life Rescue Event",
        Description:
          "Wildlife Rescue Vision is that humans come to see that we are members of a vast life community, that we experience the proper gratitude and respect for this community, and that we live in a more appropriate and compassionate manner in relation to the whole.This event is a professional wildlife rehabilitation operation to meet some of our conservation partners, take a stroll around the nature trail.",
        EventDateTime: "09 June 2023",
        MaxNoOfSeats: "1000",
        NoOfParticipentsRegistered: "60",
        City: "Hyderabad",
        Location: "Nehru Zoological Park",
        State: "Telangana",
        Status: "open",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },

      {
        Title: "Plant produce and donate the harvest",
        Description:
          "The goal of the event Plant, Grow & Share is to encourage donations of fresh, garden-grown produce to hunger relief groups. We believe that good food should be on the tables of everyone in our state. Consider the options provided and make a phone call to determine whether a group can accept donations of fresh produce. Confirm the quantity of produce they can handle, their address, and the hours they accept donations. When it comes time to donate, harvest and handle the produce with care. We have provided tips for ensuring that produce remains fresh and safe for recipients.",
        EventDateTime: "10 April 2023",
        MaxNoOfSeats: "90",
        NoOfParticipentsRegistered: "73",
        City: "Hyderabad",
        Location: "Railway colony, Secunderabad",
        State: "Telangana",
        Status: "closed",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },

      {
        Title: "Social Media Campaign on Environment",
        Description:
          "The event present a huge opportunity for organisations to tell their story and reach a wider audience by harnessing the power of digital channels such as social media to join global conversations. Some of the best digital campaigns include #BeatPlasticPollution, #OnePlasticFreeDay, #PassOnPlasticEmoji, Wastebuster & The Plastic Planet Challenge, #everydaychangemakers.",
        EventDateTime: "1 June 2023",
        MaxNoOfSeats: "1000",
        NoOfParticipentsRegistered: "69",
        City: "Hyderabad",
        Location: "Mindspace, Building 10",
        State: "Telangana",
        Status: "open",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },

      {
        Title: "Pick up Trash around the neighborhood",
        Description:
          "Picking up litter is a fun, simple, and free activity that can have instant results for your child and your community.Clear out litter from a section of park, beach, vacant lot, or your own neighborhood. Take all necessary precautions, including wearing sturdy gloves, being careful on river banks or near roads, having adults handle dangerous items, and supervising children closely. You can pick your favorite walk and do a one-time sweep, or make clean-up a regular family event.",
        EventDateTime: "18 May 2023",
        MaxNoOfSeats: "300",
        NoOfParticipentsRegistered: "96",
        City: "Hyderabad",
        Location: "RK Colony, Gachibowli",
        State: "Telangana",
        Status: "open",
        Images: "past_event1.jpg;past_event2.jpg;past_event3.jpg",
        Categories: "Cleaning Beach;plant a sapling;Community Cleaning",
      },
    ]);
    var user = await User.create({
      FirstName: "Govardhan Reddy",
      LastName: "Narala",
      Email: "reddygovardhan6826@gmail.com",
      PhoneNumber: "8309410462",
      Location: "hyderabad,telangana",
      City: "hyderabad",
      Zip: "500039",
      State: "telangana",
      isSubscribed: true,
      Interests: "Cleaning Beach;Community Cleaning",
      isRegistered: true,
    });
    await user.addEvent(1);
    await user.addEvent(2);
    await user.addEvent(3);
    console.log("running !!!");
  } catch (err) {
    console.log(err);
  }
});
