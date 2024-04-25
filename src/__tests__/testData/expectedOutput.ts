const expectedOutput = [
    {
        fileName: 'src/__tests__/testData/ppg-example-1-subject-1.csv',
        numPeaks: 772,
        hrMean: 69.11579880105248,
        hrvMean: 61.74574391551007,
        hrPercentChange: 3.585279950753997,
        hrvPercentChange: -20.339805962968644,
        rrIntervals: [
            1306, 735, 874, 809, 793, 769, 778, 782, 805, 785, 794, 747, 812,
            703, 706, 721, 735, 793, 793, 859, 825, 810, 779, 738, 668, 712,
            701, 705, 766, 781, 826, 794, 784, 747, 748, 717, 754, 762, 739,
            776, 720, 765, 1252, 415, 555, 358, 676, 539, 631, 615, 530, 566,
            602, 539, 599, 1127, 747, 345, 242, 273, 535, 543, 629, 934, 941,
            959, 1023, 971, 1094, 1068, 1123, 1145, 1060, 1100, 1074, 1020, 996,
            942, 948, 864, 827, 814, 930, 1093, 1106, 1054, 1005, 976, 991,
            1032, 1112, 1022, 1049, 928, 870, 823, 852, 936, 986, 1005, 916,
            946, 915, 933, 942, 912, 863, 908, 886, 976, 933, 898, 930, 883,
            823, 814, 749, 718, 782, 825, 807, 816, 840, 822, 857, 824, 870,
            930, 1035, 988, 979, 911, 869, 887, 903, 988, 943, 991, 973, 965,
            868, 867, 874, 896, 975, 978, 945, 972, 887, 867, 891, 869, 929,
            950, 925, 887, 886, 913, 886, 911, 917, 942, 919, 971, 903, 916,
            899, 869, 900, 945, 930, 932, 915, 945, 948, 942, 898, 916, 882,
            855, 918, 959, 975, 915, 991, 973, 981, 957, 917, 855, 897, 917,
            944, 930, 1036, 971, 931, 901, 959, 961, 914, 899, 935, 915, 896,
            977, 1006, 931, 930, 898, 1859, 883, 917, 915, 899, 874, 881, 887,
            888, 703, 176, 889, 970, 982, 1002, 963, 925, 662, 229, 927, 947,
            939, 946, 889, 914, 926, 946, 945, 901, 903, 912, 872, 885, 899,
            856, 898, 916, 811, 164, 721, 269, 943, 919, 956, 979, 958, 934,
            914, 929, 914, 903, 897, 945, 947, 943, 885, 868, 632, 1602, 737,
            1575, 857, 735, 146, 893, 864, 825, 844, 809, 868, 869, 885, 885,
            918, 611, 1338, 1091, 1574, 873, 857, 825, 898, 992, 959, 871, 842,
            778, 793, 873, 932, 1059, 1038, 993, 956, 885, 870, 812, 795, 812,
            866, 979, 1016, 1006, 975, 943, 933, 851, 825, 840, 873, 930, 1082,
            1110, 1035, 779, 192, 944, 856, 855, 886, 779, 1757, 932, 669, 317,
            860, 1736, 918, 970, 1036, 750, 284, 1005, 961, 782, 209, 713, 204,
            943, 931, 971, 813, 182, 971, 1008, 945, 929, 856, 840, 809, 913,
            977, 973, 904, 837, 782, 824, 811, 854, 911, 606, 1124, 870, 884,
            975, 931, 928, 91, 750, 122, 868, 869, 841, 839, 855, 887, 900, 928,
            946, 914, 823, 621, 193, 778, 738, 867, 916, 1007, 928, 1124, 948,
            928, 887, 810, 837, 827, 855, 976, 958, 974, 842, 823, 824, 829,
            881, 915, 947, 763, 930, 855, 810, 856, 870, 872, 826, 779, 779,
            781, 1530, 871, 853, 886, 1003, 991, 991, 946, 882, 887, 929, 977,
            1004, 1020, 976, 956, 739, 915, 913, 1003, 1010, 972, 886, 842, 734,
            809, 870, 1019, 871, 900, 358, 648, 1019, 841, 840, 824, 826, 840,
            853, 824, 933, 1618, 916, 837, 828, 810, 810, 629, 167, 808, 839,
            842, 823, 855, 660, 153, 842, 853, 792, 810, 814, 792, 856, 886,
            854, 885, 869, 825, 3318, 763, 854, 884, 825, 1847, 854, 827, 809,
            840, 824, 842, 822, 887, 899, 945, 871, 840, 1637, 824, 793, 920,
            896, 646, 1081, 842, 791, 824, 840, 871, 887, 867, 856, 871, 913,
            931, 874, 882, 810, 807, 784, 839, 946, 930, 943, 872, 854, 841,
            852, 854, 815, 866, 707, 780, 810, 793, 827, 752, 824, 807, 799,
            791, 857, 764, 811, 811, 855, 882, 890, 929, 883, 944, 887, 687,
            137, 793, 1578, 793, 781, 733, 752, 706, 702, 1486, 767, 806, 828,
            826, 856, 703, 150, 794, 1574, 799, 840, 868, 900, 884, 916, 931,
            883, 137, 945, 913, 857, 840, 822, 800, 854, 882, 914, 857, 854,
            854, 841, 810, 675, 165, 856, 902, 865, 891, 897, 722, 179, 883,
            872, 855, 630, 210, 872, 866, 871, 915, 675, 166, 795, 873, 853,
            809, 809, 812, 810, 872, 1019, 1019, 1052, 969, 962, 960, 931, 749,
            226, 736, 239, 976, 931, 929, 930, 961, 1005, 1018, 914, 855, 872,
            914, 929, 991, 706, 241, 735, 192, 869, 873, 929, 871, 855, 807,
            799, 1633, 856, 885, 691, 224, 913, 856, 825, 796, 778, 813, 882,
            903, 914, 898, 872, 823, 814, 749, 735, 687, 707, 703, 676, 705,
            767, 614, 703, 707, 718, 735, 751, 748, 767, 676, 872, 777, 827,
            883, 902, 914, 882, 873, 837, 770, 765, 854, 824, 929, 914, 105,
            840, 855, 810, 797, 809, 838, 678, 194, 809, 946, 901, 753, 179,
            823, 826, 855, 855, 869, 932, 943, 899, 874, 659, 222, 812, 808,
            783, 776, 780, 1559, 693, 692, 702, 645, 661, 464, 543, 735, 1527,
            555, 1291, 494, 1232, 584, 554, 1727,
        ],
    },
    {
        fileName: 'src/__tests__/testData/ppg-example-2-subject-2.csv',
        numPeaks: 132,
        hrMean: 74.58741158819747,
        hrvMean: 74.41882100342782,
        hrPercentChange: -2.098220797407789,
        hrvPercentChange: -34.32831117946324,
        rrIntervals: [
            1410, 795, 810, 777, 816, 568, 271, 792, 807, 798, 783, 806, 797,
            735, 852, 811, 797, 790, 784, 807, 830, 804, 800, 825, 776, 814,
            810, 807, 809, 796, 813, 794, 809, 796, 763, 872, 738, 818, 814,
            793, 797, 781, 821, 785, 791, 901, 881, 529, 1054, 415, 886, 1454,
            753, 779, 782, 806, 784, 851, 797, 612, 994, 751, 824, 794, 750,
            523, 242, 898, 664, 748, 821, 769, 808, 573, 269, 762, 826, 691,
            393, 434, 1618, 1532, 1813, 319, 808, 707, 761, 634, 181, 894, 708,
            828, 673, 148, 780, 1558, 786, 761, 793, 765, 811, 781, 1576, 765,
            797, 1590, 762, 838, 797, 796, 795, 825, 765, 779, 811, 1559, 840,
            735, 811, 446, 317, 1577, 521, 1022, 740, 775, 799, 660, 159, 797,
            1633, 531,
        ],
    },
    {
        fileName: 'src/__tests__/testData/ppg-example-3-subject-3.csv',
        numPeaks: 254,
        hrMean: 87.61045878222976,
        hrvMean: 50.68704139918909,
        hrPercentChange: -3.115833649404812,
        hrvPercentChange: -25.336210484408223,
        rrIntervals: [
            1119, 644, 660, 649, 672, 632, 658, 629, 659, 620, 675, 628, 660,
            613, 644, 648, 631, 627, 647, 601, 660, 628, 688, 603, 600, 629,
            691, 598, 1262, 676, 597, 662, 616, 734, 628, 888, 945, 613, 645,
            617, 645, 644, 556, 719, 674, 601, 1258, 765, 617, 704, 615, 690,
            661, 646, 1197, 796, 677, 661, 671, 677, 673, 676, 677, 687, 676,
            675, 705, 676, 676, 703, 675, 675, 105, 645, 659, 693, 630, 689,
            704, 646, 693, 672, 703, 677, 662, 658, 704, 1066, 268, 679, 1363,
            674, 679, 674, 670, 693, 693, 686, 689, 1354, 1347, 692, 660, 674,
            674, 676, 675, 678, 685, 676, 691, 691, 661, 674, 676, 691, 674,
            646, 689, 691, 660, 391, 271, 660, 522, 196, 661, 690, 689, 688,
            681, 686, 691, 691, 662, 689, 705, 675, 689, 675, 692, 673, 691,
            718, 633, 719, 678, 686, 676, 675, 692, 661, 687, 675, 692, 688,
            661, 675, 659, 693, 645, 686, 676, 662, 706, 357, 255, 735, 332,
            342, 709, 645, 703, 645, 675, 675, 692, 647, 675, 371, 283, 634,
            660, 689, 733, 406, 226, 703, 1188, 1380, 464, 885, 658, 690, 694,
            701, 676, 694, 687, 691, 676, 719, 701, 649, 689, 1260, 688, 708,
            643, 647, 690, 749, 615, 480, 886, 751, 613, 706, 672, 691, 736,
            735, 1382, 761, 1279, 1425, 687, 723, 387, 961, 692, 1411, 673, 718,
            1248, 749, 508, 1188, 1124, 1349, 691, 688, 677, 690, 661, 687, 690,
            708, 284, 1080, 692, 687, 2760, 407,
        ],
    },
    {
        fileName: 'src/__tests__/testData/ppg-example-4-subject-3.csv',
        numPeaks: 224,
        hrMean: 83.9022105270409,
        hrvMean: 44.32042974307489,
        hrPercentChange: -0.011256229912543525,
        hrvPercentChange: -39.68334240330196,
        rrIntervals: [
            1072, 671, 736, 702, 737, 753, 731, 722, 754, 731, 768, 684, 785,
            766, 734, 719, 691, 795, 705, 731, 772, 727, 771, 749, 749, 763,
            734, 754, 731, 752, 735, 734, 720, 689, 749, 726, 715, 708, 705,
            751, 720, 733, 737, 736, 747, 718, 737, 710, 698, 722, 688, 632,
            747, 634, 705, 707, 668, 724, 721, 690, 721, 746, 2855, 645, 734,
            702, 704, 678, 738, 1406, 690, 723, 716, 316, 273, 689, 1364, 659,
            618, 761, 737, 446, 230, 571, 762, 739, 677, 745, 706, 714, 693,
            706, 752, 703, 734, 725, 732, 737, 720, 745, 725, 735, 700, 725,
            720, 700, 707, 539, 179, 664, 751, 718, 724, 734, 719, 731, 738,
            737, 731, 736, 706, 734, 688, 765, 721, 706, 717, 707, 718, 721,
            708, 717, 783, 702, 691, 720, 780, 661, 719, 677, 716, 709, 704,
            706, 734, 732, 692, 734, 736, 676, 732, 694, 719, 703, 707, 718,
            707, 718, 718, 725, 686, 723, 719, 704, 737, 689, 722, 719, 718,
            707, 735, 704, 735, 705, 702, 709, 718, 694, 717, 659, 737, 720,
            720, 733, 692, 704, 705, 704, 709, 700, 676, 706, 704, 704, 690,
            693, 720, 691, 719, 690, 720, 702, 712, 714, 692, 718, 660, 708,
            735, 807, 735, 723, 733, 720, 692, 645, 775, 661, 888, 676, 1468,
            464, 243, 1331,
        ],
    },
]

export default expectedOutput
