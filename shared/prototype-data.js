window.AFLW_TESTS = [
  {
    id: "cmj",
    abbrev: "CMJ",
    title: "Bilateral Countermovement Jump",
    equipment: "ForceDecks/Hawkins Dynamics",
    image: "cmj.png",
    purpose: "Lower-limb power and asymmetry during jumping and landing.",
    sections: {
      "Setup": [
        "One foot on each force plate",
        "Feet self-selected width apart",
        "Hands on hips"
      ],
      "Protocol": [
        "Stand still for at least 1 second before movement",
        "Perform a quick countermovement to a self-selected depth",
        "Immediately transition into a maximal vertical jump",
        "Keep hands on hips throughout",
        "Land with one foot on each plate",
        "Stabilise quickly after landing",
        "Repeat for 3 trials in one recording"
      ],
      "Key Variables": [
        "Jump height (cm)",
        "Peak force (N)",
        "Asymmetry (%)"
      ],
      "Cues": [
        "Quick down, quick up",
        "Jump as high as possible"
      ]
    },
    videos: [
      {
        title: "Countermovement Jump",
        description: "Reference clip for jump execution.",
        src: "cmj.mp4"
      }
    ]
  },
  {
    id: "triple-hop",
    abbrev: "TVH",
    title: "Single-Leg Triple Vertical Hop",
    equipment: "HumanTrak",
    image: "triple_hop.png",
    purpose: "Trunk and knee control during forceful single-leg jump-landings.",
    sections: {
      "Setup": [
        "Stand on one leg",
        "Opposite leg off the ground",
        "Hands on hips"
      ],
      "Protocol": [
        "Perform 3 consecutive maximal vertical jumps on the same leg",
        "Minimise ground contact time between hops",
        "Stick and stabilise after the final landing",
        "Complete 3 trials per leg"
      ],
      "Key Variables": [
        "Trunk lateral flexion (deg)",
        "Trunk flexion (deg)",
        "Knee flexion (deg)",
        "Dynamic knee valgus (deg)",
        "Hop height (cm)",
        "Contact time (ms)"
      ],
      "Cues": [
        "Jump as high as possible",
        "Head through the roof on every jump",
        "Quick ground contact"
      ]
    },
    videos: []
  },
  {
    id: "hip-add-abd",
    abbrev: "HAA",
    title: "Isometric Hip Adduction and Abduction Strength",
    equipment: "ForceFrame",
    image: "hip_add_abd.png",
    purpose: "Assess maximal strength of the hip adductor and abductor muscle groups.",
    sections: {
      "Setup": [
        "Lying supine on the back",
        "Legs straight with hip and knee at 0 degrees",
        "Arms by the sides",
        "Align pads with ankle malleoli"
      ],
      "Protocol": [
        "Gradually build force",
        "Hold peak effort for approximately 3 to 5 seconds",
        "Alternate between inwards and outwards efforts",
        "Complete 3 trials per side for each direction"
      ],
      "Key Variables": [
        "Peak force (N)",
        "Adduction asymmetry (%)",
        "Abduction asymmetry (%)"
      ],
      "Cues": [
        "Squeeze or push hard",
        "Build then hold",
        "Stay stable"
      ]
    },
    videos: [
      {
        title: "Hip Adduction and Abduction Strength",
        description: "Reference clip for supine ForceFrame setup.",
        src: "hip_add_abd.mp4"
      }
    ]
  },
  {
    id: "nordic",
    abbrev: "NKB",
    title: "Eccentric Knee Flexor Strength",
    equipment: "NordBord",
    image: "nordic.png",
    purpose: "Assess maximal strength of the knee flexor muscle group.",
    sections: {
      "Setup": [
        "Kneel on padded surface",
        "Ankles secured under pads",
        "Body upright with hips extended"
      ],
      "Protocol": [
        "Slowly lean forward from the knees",
        "Maintain a straight line from shoulders to knees",
        "Resist forward motion maximally",
        "Catch the body with the hands when control is lost",
        "Reset and repeat for 3 trials"
      ],
      "Key Variables": [
        "Peak force (N)",
        "Asymmetry (%)"
      ],
      "Cues": [
        "Slow control",
        "Keep hips straight",
        "Resist as long as possible"
      ]
    },
    videos: []
  },
  {
    id: "knee-extension",
    abbrev: "IKE",
    title: "Isometric Knee Extension Strength",
    equipment: "DynaMo",
    image: "knee_extension.png",
    purpose: "Assess maximal strength of the knee extensor muscle group.",
    sections: {
      "Setup": [
        "Seated position with back supported",
        "Knee fixed at a standard test angle",
        "Dynamometer secured at the distal leg"
      ],
      "Protocol": [
        "Gradually build force over approximately 1 to 2 seconds",
        "Push into maximal knee extension",
        "Hold peak contraction for approximately 3 to 5 seconds",
        "Maintain consistent posture",
        "Complete 3 trials per side"
      ],
      "Key Variables": [
        "Peak force (N)",
        "Asymmetry (%)"
      ],
      "Cues": [
        "Kick hard",
        "Build then hold",
        "Stay still"
      ]
    },
    videos: []
  },
  {
    id: "calf",
    abbrev: "ICS",
    title: "Isometric Seated Calf Strength",
    equipment: "ForceDecks",
    image: "calf.png",
    purpose: "Assess maximal strength of the plantarflexor muscle group.",
    sections: {
      "Setup": [
        "Seated with knee flexed to approximately 90 degrees",
        "Forefoot positioned on the force plate",
        "Heel free to move"
      ],
      "Protocol": [
        "Push down through the forefoot into plantarflexion",
        "Gradually build to maximal effort",
        "Hold for approximately 3 to 5 seconds",
        "Maintain consistent foot position",
        "Complete 3 trials per side"
      ],
      "Key Variables": [
        "Peak force (N)",
        "Asymmetry (%)"
      ],
      "Cues": [
        "Push through forefoot",
        "Hold strong",
        "No rocking"
      ]
    },
    videos: []
  },
  {
    id: "knee-to-wall",
    abbrev: "KTW",
    title: "Weight-Bearing Ankle Dorsiflexion Range of Motion",
    equipment: "DynaMo / ruler",
    image: "knee_to_wall.png",
    purpose: "Measure weight-bearing ankle dorsiflexion range.",
    sections: {
      "Setup": [
        "Foot placed flat on the ground facing a wall",
        "Heel remains in contact with the floor",
        "Measure distance or angle"
      ],
      "Protocol": [
        "Lunge the knee forward toward the wall",
        "Keep the heel down throughout",
        "Move until maximal dorsiflexion is reached",
        "Record distance or angle",
        "Repeat for 2 to 3 trials per side"
      ],
      "Key Variables": [
        "Distance (cm) or angle (deg)",
        "Side-to-side difference"
      ],
      "Cues": [
        "Keep heel down",
        "Drive knee forward",
        "Move smoothly"
      ]
    },
    videos: []
  },
  {
    id: "neck-strength",
    abbrev: "INS",
    title: "Isometric Neck Strength",
    equipment: "Dynamometer / manual setup",
    image: "neck_strength.png",
    purpose: "Assess maximal strength of the neck muscle groups across flexion, extension, and lateral flexion.",
    sections: {
      "Setup": [
        "Athlete seated or standing",
        "Neutral head and trunk position",
        "Device or resistance applied in the test direction"
      ],
      "Protocol": [
        "Test flexion, extension, left lateral flexion, and right lateral flexion",
        "For maximal strength trials, gradually build force over 1 to 2 seconds and hold for 3 to 5 seconds",
        "For rate of force development trials, contract as fast and hard as possible from rest",
        "Maintain posture and alignment",
        "Complete 2 to 3 trials per direction"
      ],
      "Key Variables": [
        "Peak force (N)",
        "Rate of force development (N/s)",
        "Directional asymmetry"
      ],
      "Cues": [
        "Build pressure",
        "Hold steady",
        "Stay aligned"
      ]
    },
    videos: []
  },
  {
    id: "body-scan",
    abbrev: "3DS",
    title: "3D Body Scan",
    equipment: "HumanTrak",
    image: "body_scan.png",
    purpose: "Anthropometric profiling.",
    sections: {
      "Setup": [
        "Athlete positioned in the scanning area",
        "Arms slightly abducted",
        "Feet shoulder-width apart"
      ],
      "Protocol": [
        "Stand still in a standardised posture",
        "Maintain neutral alignment",
        "Remain motionless during the scan",
        "Complete a single capture"
      ],
      "Key Variables": [
        "Segment lengths",
        "Body dimensions",
        "Symmetry metrics"
      ],
      "Cues": [
        "Stand still",
        "Neutral posture"
      ]
    },
    videos: []
  },
  {
    id: "sidestep",
    abbrev: "USS",
    title: "Unanticipated Sidestep",
    equipment: "OpenCap + SmartSpeed",
    image: "sidestep.png",
    setupDiagram: {
      src: "COD_diagram.png",
      alt: "Unanticipated sidestep setup diagram showing the approach lane, timing gates, and left-right sidestep options."
    },
    purpose: "Reactive change-of-direction mechanics.",
    sections: {
      "Setup": [
        "Set approach distance and timing gates",
        "Athlete starts from a standardised position",
        "Prepare the random directional cue system"
      ],
      "Protocol": [
        "Accelerate toward the decision point",
        "Respond to the random directional cue",
        "Perform the sidestep cut in the indicated direction",
        "Maintain speed through the movement",
        "Continue through the exit gate",
        "Complete 3 to 5 trials"
      ],
      "Key Variables": [
        "Joint kinematics",
        "Movement time",
        "Modelled loading metrics"
      ],
      "Cues": [
        "React quickly",
        "Lower the centre of mass",
        "Push off strongly"
      ]
    },
    videos: [
      {
        title: "Sidestep Gates Setup",
        description: "Reference clip for timing gate arrangement.",
        src: "sidestep_gates.mp4"
      }
    ]
  }
];
