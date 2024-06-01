document.addEventListener("DOMContentLoaded", function() {
    const speffzCorners = {
        ULB: 'A', URB: 'B', URF: 'C', UFL: 'D',
        DLF: 'E', DFR: 'F', DRB: 'G', DBL: 'H',
        ULF: 'I', URB: 'J', UFR: 'K', UBL: 'L',
        DFL: 'M', DRF: 'N', DLB: 'O', DBR: 'P'
    };

    const speffzEdges = {
        UL: 'A', UR: 'B', UF: 'C', UB: 'D',
        FL: 'E', FR: 'F', BL: 'G', BR: 'H',
        DL: 'I', DR: 'J', DF: 'K', DB: 'L',
        LF: 'M', RF: 'N', LB: 'O', RB: 'P'
    };

    document.getElementById('generate-button').addEventListener('click', function() {
        const scramble = document.getElementById('scramble-input').value.trim();
        const notationsOutput = document.getElementById('notations-output');

        if (scramble === '') {
            notationsOutput.textContent = 'Please enter a scramble.';
            return;
        }

        const cubeState = parseScramble(scramble);
        const cornerCycles = generateCornerCycles(cubeState);
        const edgeCycles = generateEdgeCycles(cubeState);

        const cornerNotation = cornerCycles.map(cycle => cycle.map(c => speffzCorners[c]).join('')).join(' ');
        const edgeNotation = edgeCycles.map(cycle => cycle.map(e => speffzEdges[e]).join('')).join(' ');

        notationsOutput.textContent = `Corners: ${cornerNotation}\nEdges: ${edgeNotation}`;
    });

    function parseScramble(scramble) {
        const cube = new cubing.alg.cube3.Cube();
        cube.move(scramble);
        return cube;
    }

    function generateCornerCycles(cubeState) {
        const cycles = [];
        const visited = new Set();

        for (const corner of Object.keys(speffzCorners)) {
            if (!visited.has(corner)) {
                const cycle = [];
                let currentCorner = corner;

                while (!visited.has(currentCorner)) {
                    cycle.push(currentCorner);
                    visited.add(currentCorner);
                    currentCorner = getNextCorner(cubeState, currentCorner);
                }

                cycles.push(cycle);
            }
        }

        return cycles;
    }

    function generateEdgeCycles(cubeState) {
        const cycles = [];
        const visited = new Set();

        for (const edge of Object.keys(speffzEdges)) {
            if (!visited.has(edge)) {
                const cycle = [];
                let currentEdge = edge;

                while (!visited.has(currentEdge)) {
                    cycle.push(currentEdge);
                    visited.add(currentEdge);
                    currentEdge = getNextEdge(cubeState, currentEdge);
                }

                cycles.push(cycle);
            }
        }

        return cycles;
    }

    function getNextCorner(cubeState, corner) {
        // Mapping of corner stickers to their next positions
        const cornerMapping = {
            ULB: 'ULB', URB: 'URF', URF: 'UFL', UFL: 'ULB',
            DLF: 'DFR', DFR: 'DRB', DRB: 'DBL', DBL: 'DLF',
            ULF: 'ULB', URB: 'URF', UFR: 'UFL', UBL: 'ULF',
            DFL: 'DFR', DRF: 'DRB', DLB: 'DBL', DBR: 'DLF'
        };

        return cornerMapping[corner];
    }

    function getNextEdge(cubeState, edge) {
        // Mapping of edge stickers to their next positions
        const edgeMapping = {
            UL: 'UR', UR: 'UF', UF: 'UB', UB: 'UL',
            FL: 'FR', FR: 'BL', BL: 'BR', BR: 'FL',
            DL: 'DR', DR: 'DF', DF: 'DB', DB: 'DL',
            LF: 'RF', RF: 'LB', LB: 'RB', RB: 'LF'
        };

        return edgeMapping[edge];
    }
});
