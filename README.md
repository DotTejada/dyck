# Dyck Path Viewer

This is a tool I created for my math research project at The University of Alabama. We were studying dyck paths, sequences, and qt-Catalan numbers. It quickly became tedious to draw the paths and calculate their statistics at large n's.

Each dyck path has its drawn path, the unique sequence representing it to its left, and its qt statistics above it.

The number next to q is the dinv statistic (diagonal inverse) which (taking g to denote the dyck sequence) is calculated by the number of pairs where g[i] - g[j] == 0 or 1 and i < j.

The number next to t is the area statstic which is just the number of full squares present within the path, or alternatively the sum of the entire dyck sequence.

- "d" to move right a page
- "a" to move left a page
- You can search for a specific dyck sequence and it will take you to its location and highlight it
- You can jump to a specific page
- You can change the n you want to look at

Things I may add: searching by qt statistics, support for much larger n's through lazy evaluation
