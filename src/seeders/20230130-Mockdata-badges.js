"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("badges", [
      {
        badgeId: "1d16eae5-5073-4966-978f-79569af028bb",
        name: "Stretch & Recover 2",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Luteal",
        difficultyLevel: "Easy",
        excludes: JSON.stringify({"1":"Swimming","2":"Cycling"}),
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "time(in minutes)",
        defaultTrack: 7,
        possibleTrackRange: "0-15" ,
        trackChangeValue: 1,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/stretch","2":"www.youtube.com/stretch2"}),
        meta:JSON.stringify({"Description":"Take 10 minutes to engage in active stretching & foam roll to create happy muscles" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1d26eae5-5073-4966-978f-79569af028bb",
        name: "Core Connection ",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Luteal",
        difficultyLevel: "Easy",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "",
        trackParameter:  "time(in minutes)",
        defaultTrack: 5,
        possibleTrackRange: "0-15" ,
        trackChangeValue: 1,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/core","2":"www.youtube.com/core2"}),
        meta:JSON.stringify({"Description":"Motivation to pump out mountain climbers or crunches during this time will start to slip, and it becomes the perfect opportunity to ensure you are keeping your foundations strong! By completing this simple round of core connection breath, you keep your deep inner core muscles strong" }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1d36eae5-5073-4966-978f-79569af028bb",
        name: "Stretch & Recover 1",
        frequency: "2 * daily",
        grantBadge: "period",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Menstrual",
        difficultyLevel: "Easy",
        excludes: JSON.stringify({"1":"Swimming","2":"Cycling"}),
        onboarding: "yes",
        naturalProgression: "",
        trackParameter:  "time(in minutes)",
        defaultTrack: 15,
        possibleTrackRange: "0-30" ,
        trackChangeValue: 5,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/stretch","2":"www.youtube.com/stretch2"}),
        meta:JSON.stringify({"Description":"Breathe into these movements and release the feel-good endorphins which can help minimize your period pain."}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1d46eae5-5073-4966-978f-79569af028bb",
        name: "Beginner AMRAP Challenge",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Easy",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "1d66eae5-5073-4966-978f-79569af028bb",
        trackParameter:  "time(in minutes)",
        defaultTrack: 4,
        possibleTrackRange: "0-15" ,
        trackChangeValue: 1,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":"Don't let sets and reps restrain your strength - use the 'As Many Reps As Possible' challenge to create a quick burn each day. Set your timer for 60 seconds\nDo they exercise listed for 60 seconds and rest for 60 seconds. Repeat until you can't continue! How many reps did you get" ,"\nRecommendations": "Squats"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1d56eae5-5073-4966-978f-79569af028bb",
        name: "Beginner AMRAP Challenge",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Ovulation",
        difficultyLevel: "Easy",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "1d76eae5-5073-4966-978f-79569af028bb",
        trackParameter:  "time(in minutes)",
        defaultTrack: 4,
        possibleTrackRange: "0-15" ,
        trackChangeValue: 1,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":"Don't let sets and reps restrain your strength - use the 'As Many Reps As Possible' challenge to create a quick burn each day. Set your timer for 60 seconds\n. Do they exercise listed for 60 seconds and rest for 60 seconds. Repeat until you can't continue! How many reps did you get" ,"\nRecommendations": "Squats"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1d66eae5-5073-4966-978f-79569af028bb",
        name: "Intermediate AMRAP Challenge",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Moderate",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "1d86eae5-5073-4966-978f-79569af028bb",
        trackParameter:  "time(in minutes)",
        defaultTrack: 5,
        possibleTrackRange: "0-15" ,
        trackChangeValue: 1,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":"Don't let sets and reps restrain your strength - use the 'As Many Reps As Possible' challenge to create a quick burn each day. Set your timer for 60 seconds\n. Do they exercise listed for 60 seconds and rest for 60 seconds. Repeat until you can't continue! How many reps did you get" ,"\nRecommendations": "Pulse squats"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1d76eae5-5073-4966-978f-79569af028bb",
        name: "Intermediate AMRAP Challenge",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Ovulation",
        difficultyLevel: "Moderate",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "1d96eae5-5073-4966-978f-79569af028bb",
        trackParameter:  "time(in minutes)",
        defaultTrack: 5,
        possibleTrackRange: "0-15" ,
        trackChangeValue: 1,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":"Don't let sets and reps restrain your strength - use the 'As Many Reps As Possible' challenge to create a quick burn each day. Set your timer for 60 seconds\n. Do they exercise listed for 60 seconds and rest for 60 seconds. Repeat until you can't continue! How many reps did you get" ,"\nRecommendations": "Pulse squats"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1d86eae5-5073-4966-978f-79569af028bb",
        name: "Advanced AMRAP Challenge",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Advanced",
        excludes: null,
        onboarding: "no",
        naturalProgression: "",
        trackParameter:  "time(in minutes)",
        defaultTrack: 6,
        possibleTrackRange: "0-15" ,
        trackChangeValue: 1,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":"Don't let sets and reps restrain your strength - use the 'As Many Reps As Possible' challenge to create a quick burn each day. Set your timer for 60 seconds\n. Do they exercise listed for 60 seconds and rest for 60 seconds. Repeat until you can't continue! How many reps did you get" ,"\nRecommendations": "Squat jumps: squat down 90 degrees and explode up into a jump. Sink back down into a squat"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1d96eae5-5073-4966-978f-79569af028bb",
        name: "Advanced AMRAP Challenge",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Ovulation",
        difficultyLevel: "Advanced",
        excludes: null,
        onboarding: "no",
        naturalProgression: "",
        trackParameter:  "time(in minutes)",
        defaultTrack: 6,
        possibleTrackRange: "0-15" ,
        trackChangeValue: 1,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":"Don't let sets and reps restrain your strength - use the 'As Many Reps As Possible' challenge to create a quick burn each day. Set your timer for 60 seconds\n. Do they exercise listed for 60 seconds and rest for 60 seconds. Repeat until you can't continue! How many reps did you get" ,"\nRecommendations": "Squat jumps: squat down 90 degrees and explode up into a jump. Sink back down into a squat"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1e16eae5-5073-4966-978f-79569af028bb",
        name: "5,000 STEPS",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Easy",
        excludes: JSON.stringify({"1":"Swimming","2":"Cycling"}),
        onboarding: "yes",
        naturalProgression: "1e26eae5-5073-4966-978f-79569af028bb",
        trackParameter: "steps",
        defaultTrack: 5000,
        possibleTrackRange: "0-20000" ,
        trackChangeValue: 500,
        type: "Habit",
        media: null,
        meta:JSON.stringify({"Description":"Set a timer on your phone and get up and move for 2-3 minutes every hour. Take the stairs instead of the lift. Park a few blocks away from your work and walk the remainining distance. Or, grab your gym buddy and go for your walk!"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1e26eae5-5073-4966-978f-79569af028bb",
        name: "7,500 STEPS",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Moderate",
        excludes: JSON.stringify({"1":"Swimming","2":"Cycling"}),
        onboarding: "yes",
        naturalProgression: "1e36eae5-5073-4966-978f-79569af028bb",
        trackParameter: "steps",
        defaultTrack: 7500,
        possibleTrackRange: "1-20000" ,
        trackChangeValue: 500,
        type: "Habit",
        media: null,
        meta:JSON.stringify({"Description":"Set a timer on your phone and get up and move for 2-3 minutes every hour. Take the stairs instead of the lift. Park a few blocks away from your work and walk the remainining distance. Or, grab your gym buddy and go for your walk!"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1e36eae5-5073-4966-978f-79569af028bb",
        name: "10,000 STEPS",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Advanced",
        excludes: JSON.stringify({"1":"Swimming","2":"Cycling"}),
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "steps",
        defaultTrack: 10000,
        possibleTrackRange: "2-20000" ,
        trackChangeValue: 500,
        type: "Habit",
        media: null,
        meta:JSON.stringify({"Description":"Set a timer on your phone and get up and move for 2-3 minutes every hour. Take the stairs instead of the lift. Park a few blocks away from your work and walk the remainining distance. Or, grab your gym buddy and go for your walk!"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1e46eae5-5073-4966-978f-79569af028bb",
        name: "Full Body WorkOut EASY - A",
        frequency: "10 days/month",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Easy",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "Full Body WorkOut MODERATE - A",
        trackParameter:  "time(in minutes)",
        defaultTrack: 20,
        possibleTrackRange: "0 - 30 mins" ,
        trackChangeValue: 5,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":" In this phase, it's the time to build muscle and see how much strength you can build. Create a balanced and strong body by engaging in this full-body workouts"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1e56eae5-5073-4966-978f-79569af028bb",
        name: "Full Body WorkOut EASY - B",
        frequency: "10 days/month",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Easy",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "Full Body WorkOut MODERATE - B",
        trackParameter:  "time(in minutes)",
        defaultTrack: 20,
        possibleTrackRange: "0 - 30 mins" ,
        trackChangeValue: 5,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":" In this phase, it's the time to build muscle and see how much strength you can build. Create a balanced and strong body by engaging in this full-body workouts"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1e66eae5-5073-4966-978f-79569af028bb",
        name: "Full Body WorkOut MODERATE - A",
        frequency: "10 days/month",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Moderate",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "Full Body WorkOut ADVANCED - A",
        trackParameter:  "time(in minutes)",
        defaultTrack: 30,
        possibleTrackRange: "0 - 45 mins" ,
        trackChangeValue: 5,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":" In this phase, it's the time to build muscle and see how much strength you can build. Create a balanced and strong body by engaging in this full-body workouts"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1e76eae5-5073-4966-978f-79569af028bb",
        name: "Full Body WorkOut MODERATE - B",
        frequency: "10 days/month",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Moderate",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "Full Body WorkOut ADVANCED - B",
        trackParameter:  "time(in minutes)",
        defaultTrack: 30 ,
        possibleTrackRange: "0 - 30 mins" ,
        trackChangeValue: 5,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":" In this phase, it's the time to build muscle and see how much strength you can build. Create a balanced and strong body by engaging in this full-body workouts"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1e86eae5-5073-4966-978f-79569af028bb",
        name: "Full Body WorkOut ADVANCED - A",
        frequency: "10 days/month",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Advanced",
        excludes: null,
        onboarding: "no",
        naturalProgression: "",
        trackParameter:  "time(in minutes)",
        defaultTrack: 40,
        possibleTrackRange: "0 - 60 mins" ,
        trackChangeValue: 5,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":" In this phase, it's the time to build muscle and see how much strength you can build. Create a balanced and strong body by engaging in this full-body workouts"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1e96eae5-5073-4966-978f-79569af028bb",
        name: "Full Body WorkOut ADVANCED - B",
        frequency: "10 days/month",
        grantBadge: "10",
        badgeRunway: "",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Advanced",
        excludes: null,
        onboarding: "no",
        naturalProgression: "",
        trackParameter:  "time (in minutes)",
        defaultTrack: 40,
        possibleTrackRange: "0 - 60 mins" ,
        trackChangeValue: 5,
        type: "Fitness",
        media: JSON.stringify({"1":"www.youtube.com/amrap","2":"www.youtube.com/amrap2"}),
        meta:JSON.stringify({"Description":" In this phase, it's the time to build muscle and see how much strength you can build. Create a balanced and strong body by engaging in this full-body workouts"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1f16eae5-5073-4966-978f-79569af028bb",
        name: "Water Warrior",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Moderate",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "quantity (in litres)",
        defaultTrack: 3,
        possibleTrackRange: "0 - 5" ,
        trackChangeValue: 0.5,
        type: "Habit",
        media: null,
        meta:JSON.stringify({"Description":"Drink sufficient water on a given day. On days you consume caffeine or alcohol, or are in your luteal phase, hydrate yourself even more! "}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1f26eae5-5073-4966-978f-79569af028bb",
        name: "Water Warrior",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Ovulation",
        difficultyLevel: "Moderate",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "quantity (in litres)",
        defaultTrack: 3,
        possibleTrackRange: "0 - 5" ,
        trackChangeValue: 0.5,
        type: "Habit",
        media: null,
        meta:JSON.stringify({"Description":"Drink sufficient water on a given day. On days you consume caffeine or alcohol, or are in your luteal phase, hydrate yourself even more! "}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1f36eae5-5073-4966-978f-79569af028bb",
        name: "Water Warrior",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Luteal",
        difficultyLevel: "Moderate",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "quantity (in litres)",
        defaultTrack: 3,
        possibleTrackRange: "0 - 5 " ,
        trackChangeValue: 0.5,
        type: "Habit",
        media: null,
        meta:JSON.stringify({"Description":"Drink sufficient water on a given day. On days you consume caffeine or alcohol, or are in your luteal phase, hydrate yourself even more! "}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1f46eae5-5073-4966-978f-79569af028bb",
        name: "Water Warrior",
        frequency: "daily",
        grantBadge: "10",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Menstruation",
        difficultyLevel: "Moderate",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "quantity (in litres)",
        defaultTrack: 3 ,
        possibleTrackRange: "0 - 5 " ,
        trackChangeValue: 0.5 ,
        type: "Habit",
        media: null,
        meta:JSON.stringify({"Description":"Drink sufficient water on a given day. On days you consume caffeine or alcohol, or are in your luteal phase, hydrate yourself even more! "}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1f56eae5-5073-4966-978f-79569af028bb",
        name: "Power Protein",
        frequency: "daily",
        grantBadge: "7",
        badgeRunway: "cycle",
        timeOfTheDay: "Morning",
        phase: "Luteal",
        difficultyLevel: "Easy",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "",
        defaultTrack: null,
        possibleTrackRange: "" ,
        trackChangeValue: null,
        type: "Nutrition",
        media: null,
        meta:JSON.stringify({"Description": "Increasing protein intake in breakfast helps you feel satiated for longer through the day. It also keeps cravings at bay! Choose any 1 of these: a glass of milk or 2 whole eggs or a handful of nuts or a single portion of paneer, tofu, or chicken."}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1f66eae5-5073-4966-978f-79569af028bb",
        name: "Digestive Tea",
        frequency: "daily",
        grantBadge: "7",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Easy",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "",
        defaultTrack: null,
        possibleTrackRange: "" ,
        trackChangeValue: null,
        type: "Nutrition",
        media: null,
        meta:JSON.stringify({"Description": "Drinking digestive teas after meals helps in regulating appetite and curbs cravings for sweet food. Some teas you can rotate through the week: Jeera tea or Peppermint tea or Licorice root tea or Dry ginger tea or Fennel seed tea"}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1f76eae5-5073-4966-978f-79569af028bb",
        name: "Veggie Delight",
        frequency: "2 * week",
        grantBadge: "4",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Easy",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "",
        defaultTrack: null,
        possibleTrackRange: "" ,
        trackChangeValue: null,
        type: "Nutrition",
        media: null,
        meta:JSON.stringify({"Description": "Introduce cruciferous vegetables to your day.\n Cruciferous vegetables help with the synthesis of DIM which helps manage estrogen excess. Have 1 bowl twice a week. "}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        badgeId: "1f86eae5-5073-4966-978f-79569af028bb",
        name: "OMG-3",
        frequency: "daily",
        grantBadge: "7",
        badgeRunway: "cycle",
        timeOfTheDay: "",
        phase: "Follicular",
        difficultyLevel: "Easy",
        excludes: null,
        onboarding: "yes",
        naturalProgression: "",
        trackParameter: "",
        defaultTrack: null,
        possibleTrackRange: "" ,
        trackChangeValue: null,
        type: "Nutrition",
        media: null,
        meta:JSON.stringify({"Description": "Add omega-3 rich foods to your diet daily as this helps in reducing menstrual pain. Some options:\n seafood or flax seeds (1-2 tbsp/day) or sabja seeds (1-2 tbsp/day) or chia seeds (1-2tbsp/day) or fish oil capsule (1000mg/day) "}),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("badges", null, {});
  },
};
