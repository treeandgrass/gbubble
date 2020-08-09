export class Interpolant {
  public sampleSize: number;
  public positions: Float32Array;
  public samples: Float32Array;
  public cachedIndex: number;
  constructor(positions: Float32Array, samples: Float32Array, sampleSize: number) {
    this.cachedIndex = 0;
    this.positions = positions;
    this.sampleSize = sampleSize;
    this.samples = samples;
  }

  // From: https://github.com/mrdoob/three.js/blob/master/src/math/Interpolant.js#L36
  public evaluate(t: number) {
    const pp = this.positions;
    let i1 = 0;

    let t1 = pp[ i1 ];
    let t0 = pp[ i1 - 1 ];

    // tslint:disable: label-position
    validate_interval: {

      seek: {

        let right;

        linear_scan: {

          forward_scan: if ( ! ( t < t1 ) ) {

            // tslint:disable-next-line: no-shadowed-variable
            for ( const giveUpAt = i1 + 2; ; ) {

              if ( t1 === undefined ) {

                if ( t < t0 ) {
                  break forward_scan;
                }

                // after end

                i1 = pp.length;
                this.cachedIndex = i1;
                return this.afterInter( i1 - 1, t, t0 );

              }

              if ( i1 === giveUpAt ) {
                break;
              }

              t0 = t1;
              t1 = pp[ ++ i1 ];

              if ( t < t1 ) {

                // we have arrived at the sought interval
                break seek;

              }

            }

            // prepare binary search on the right side of the index
            right = pp.length;
            break linear_scan;

          }

          if ( ! ( t >= t0 ) ) {

            // looping?

            const t1global = pp[ 1 ];

            if ( t < t1global ) {

              i1 = 2; // + 1, using the scan for the details
              t0 = t1global;

            }

            // linear reverse scan

            for (const giveUpAt = i1 - 2; ; ) {

              if ( t0 === undefined ) {

                // before start

                this.cachedIndex = 0;
                return this.beforeInter( 0, t, t1 );

              }

              if ( i1 === giveUpAt ) {
                break;
              }

              t1 = t0;
              t0 = pp[ -- i1 - 1 ];

              if ( t >= t0 ) {

                // we have arrived at the sought interval
                break seek;

              }

            }

            // prepare binary search on the left side of the index
            right = i1;
            i1 = 0;
            break linear_scan;

          }

          // the interval is valid

          break validate_interval;

        } // linear scan

        // binary search

        while ( i1 < right ) {

          // tslint:disable-next-line: no-bitwise
          const mid = ( i1 + right ) >>> 1;

          if ( t < pp[ mid ] ) {

            right = mid;

          } else {

            i1 = mid + 1;

          }

        }

        t1 = pp[ i1 ];
        t0 = pp[ i1 - 1 ];

        if ( t0 === undefined ) {

          this.cachedIndex = 0;
          return this.beforeInter( 0, t, t1 );

        }

        if ( t1 === undefined ) {

          i1 = pp.length;
          this.cachedIndex = i1;
          return this.afterInter( i1 - 1, t0, t );

        }

      }

      this.intervalChanged( i1, t0, t1 );

    }

    return this.inter( i1, t0, t, t1 );

  }

  public inter(i: number, t0: number, t: number, t1: number): Float32Array {
    return new Float32Array(0);
  }

  private intervalChanged(i1: number, t0: number, t1: number) {
    //
  }

  private beforeInter(i: number, t0: number, t: number): Float32Array {
    return new Float32Array(0);
  }

  private afterInter(t: number, t1: number, t0: number): Float32Array {
    return new Float32Array(0);
  }
}
