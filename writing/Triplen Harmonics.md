---
created: 2026-01-07
categories: [Electrical Engineering, Power Systems, Signal Theory]
tags: [harmonics, power-quality, three-phase-systems, neutral-currents]
---

# Triplen Harmonics

Harmonics that are odd multiples of 3 (3rd, 9th, 15th, 21st...) - problematic in [[Three-Phase Power Systems|three-phase systems]] because they sum in the neutral conductor rather than cancelling.

## Definition

**Triplen = 3(2n-1) where n = 1, 2, 3...**
- 3rd harmonic (150Hz at 50Hz fundamental)
- 9th harmonic (450Hz)
- 15th harmonic (750Hz)
- 21st harmonic (1050Hz)

Note: 6th, 12th, 18th are *not* triplen - they're even multiples of 3.

## Why They Matter

**Normal Harmonic Cancellation**
- In balanced three-phase, phases offset 120°
- Fundamental currents sum to zero in neutral
- Most harmonics also cancel (5th, 7th, 11th, etc.)

**Triplen Exception**
- 3rd harmonic: 3 × 120° = 360° = in-phase
- All three phases' triplen components align
- They *add* in neutral instead of cancelling
- Neutral current = 3× phase triplen current

## Mathematical Basis

**Phase Relationships at 3rd Harmonic**
```
Phase A: sin(3ωt)
Phase B: sin(3(ωt - 120°)) = sin(3ωt - 360°) = sin(3ωt)
Phase C: sin(3(ωt - 240°)) = sin(3ωt - 720°) = sin(3ωt)
```

All identical → constructive addition in neutral.

## Common Sources

**Switched-Mode Power Supplies**
- Rectifier front-end draws current at voltage peaks
- Heavily distorted current waveform
- Rich in 3rd harmonic (often 80%+ of fundamental)

**Fluorescent Lighting**
- Electronic ballasts
- Similar peak-drawing behaviour

**Variable Frequency Drives**
- Six-pulse rectifiers produce 5th, 7th primarily
- But input filtering can shift to triplens

**Saturated Transformers**
- Magnetising current distortion
- Core saturation generates odd harmonics

## Problems Caused

**Neutral Conductor Overload**
- Designed for imbalance current only
- Triplen currents can exceed phase currents
- Overheating, fire risk
- Older installations: neutral sized smaller than phase

**Transformer Heating**
- Delta-wye transformers trap triplens in delta winding
- Circulating currents → additional losses
- Derating required

**Telephone Interference**
- 3rd harmonic (150Hz) close to audio band
- Induced noise in adjacent telecom cables

**Zero-Sequence Effects**
- Triplens are [[Zero-Sequence Components|zero-sequence]]
- Flow through earth paths
- Ground potential rise issues

## Mitigation Strategies

**Oversized Neutrals**
- Size neutral at 1.73× phase conductor
- Or use double neutral conductors
- Required by modern codes in some jurisdictions

**Harmonic Filters**
- Passive LC filters tuned to 150Hz
- [[Active Power Filters]] for dynamic compensation
- Zero-sequence filters specifically

**Phase-Shifting Transformers**
- Multiple rectifier systems with phase offset
- 30° shift between groups cancels triplens
- Common in large VFD installations

**K-Rated Transformers**
- Designed for harmonic loads
- K-13 or K-20 ratings for high triplen environments
- Better thermal performance

**Delta-Connected Loads**
- No neutral path → triplens circulate in delta
- Reduces system-wide propagation
- Increases delta winding losses

**Zig-Zag Transformers**
- Low zero-sequence impedance
- Provides local triplen current path
- Reduces neutral-to-ground voltage

## Measurement

**THD vs Individual Harmonics**
- [[Total Harmonic Distortion|THD]] doesn't distinguish triplens
- Measure 3rd, 9th, 15th individually
- Use [[Power Quality Analysers]]

**Neutral Current Measurement**
- Compare neutral to phase currents
- Ratio > 0 indicates triplen presence
- Can exceed 173% in severe cases

## Sequence Components

| Harmonic | Sequence | Rotation |
|----------|----------|----------|
| 1st | Positive | Forward |
| 3rd | Zero | None |
| 5th | Negative | Reverse |
| 7th | Positive | Forward |
| 9th | Zero | None |
| 11th | Negative | Reverse |

Pattern repeats: +, -, 0, +, -, 0...

## Standards

- [[IEC 61000-3-2]] - harmonic current limits
- [[IEEE 519]] - harmonic control in power systems
- AS/NZS 61000.3.2 - Australian/NZ adoption

## Related
- [[Harmonics in Power Systems]]
- [[Three-Phase Power Systems]]
- [[Power Quality]]
- [[Zero-Sequence Components]]
- [[Neutral Conductor Sizing]]
- [[Total Harmonic Distortion]]
- [[Active Power Filters]]
- [[Harmonics]]
- [[Fourier Analysis]]
- [[Signal Processing]]
