import './SourcingModelDiagram.css';

type Props = {
  className?: string;
};

/**
 * Animated “how Forez sources” diagram for the home hero (left column).
 */
export default function SourcingModelDiagram({ className = '' }: Props) {
  return (
    <div className={className}>
      <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-blue-200/85 mb-0.5 px-0.5 sm:mb-1 sm:text-[9px]">
        Sourcing model
      </p>
      <div
        className="sourcing-model-root"
        role="img"
        aria-label="Diagram: your order flows into Forez hub, then to own suppliers, partner network, or custom manufacturing, with fast delivery."
      >
        <div className="relative mx-auto flex h-[min(38vh,168px)] w-full max-w-[min(100%,100%)] justify-center overflow-hidden sm:h-[220px] sm:max-w-[min(100%,520px)] md:h-[280px] lg:h-[318px]">
          <div className="absolute left-1/2 top-0 origin-top -translate-x-1/2 scale-[0.38] sm:scale-[0.44] md:scale-[0.52] lg:scale-[0.58]">
            <div className="scene">
                <div className="tagline">Industrial Sourcing · Fast Turnaround · Custom Orders</div>

                <div className="logo-area">
                  <div className="logo-text-block">
                    <div className="forez-name">FOREZ</div>
                    <div className="certified-badge">
                      <span className="certified-text">Certified</span>
                      <span className="nyc-badge">NYC</span>
                      <span className="mbe-text">Minority Business Enterprise</span>
                    </div>
                  </div>
                </div>

                <div className="hub">
                  <div className="hub-name">FOREZ</div>
                  <div className="hub-sub">
                    NYC MBE Certified
                    <br />
                    Industrial Sourcing
                  </div>
                </div>

                <div className="node node-contractor">
                  <div className="node-title">You place an order</div>
                  <div className="node-sub">Standard, bulk, or custom — any product you need</div>
                </div>

                <div className="node node-own">
                  <div className="node-title">Our own suppliers</div>
                  <div className="node-sub">
                    Pre-negotiated stock
                    <br />
                    Ships immediately
                  </div>
                </div>

                <div className="node node-partner">
                  <div className="node-title">Partner network</div>
                  <div className="node-sub">
                    Trusted vendors
                    <br />
                    Wide product range
                  </div>
                </div>

                <div className="node node-custom">
                  <div className="node-title">Custom orders</div>
                  <div className="node-sub">
                    Spec it — we build it
                    <br />
                    Manufactured to order
                  </div>
                </div>

                <div className="delivery">Delivered to you — fast turnaround, every time</div>

                <svg className="arrows-svg" viewBox="0 0 900 600" aria-hidden>
                  <defs>
                    <marker
                      id="sourcing-ah1"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto"
                    >
                      <path
                        d="M2 1L8 5L2 9"
                        fill="none"
                        stroke="#42a5f5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </marker>
                    <marker
                      id="sourcing-ah2"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto"
                    >
                      <path
                        d="M2 1L8 5L2 9"
                        fill="none"
                        stroke="#4db6ac"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </marker>
                    <marker
                      id="sourcing-ah3"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto"
                    >
                      <path
                        d="M2 1L8 5L2 9"
                        fill="none"
                        stroke="#ab47bc"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </marker>
                    <marker
                      id="sourcing-ah4"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto"
                    >
                      <path
                        d="M2 1L8 5L2 9"
                        fill="none"
                        stroke="#ffa726"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </marker>
                  </defs>

                  <line
                    className="arrow-line a1"
                    x1="450"
                    y1="248"
                    x2="450"
                    y2="272"
                    markerEnd="url(#sourcing-ah1)"
                    strokeDasharray="120"
                    strokeDashoffset="120"
                  />

                  <line
                    className="arrow-line a2"
                    x1="380"
                    y1="338"
                    x2="200"
                    y2="338"
                    markerEnd="url(#sourcing-ah2)"
                    strokeDasharray="180"
                    strokeDashoffset="180"
                  />

                  <line
                    className="arrow-line a3"
                    x1="520"
                    y1="338"
                    x2="700"
                    y2="338"
                    markerEnd="url(#sourcing-ah3)"
                    strokeDasharray="180"
                    strokeDashoffset="180"
                  />

                  <line
                    className="arrow-line a4"
                    x1="450"
                    y1="408"
                    x2="450"
                    y2="458"
                    markerEnd="url(#sourcing-ah4)"
                    strokeDasharray="120"
                    strokeDashoffset="120"
                  />

                  <circle className="pulse-dot p1" cx="450" cy="260" r="4">
                    <animate attributeName="cy" values="248;272" dur="1.5s" repeatCount="indefinite" begin="3.2s" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" begin="3.2s" />
                  </circle>

                  <circle className="pulse-dot p2" cx="350" cy="338" r="4">
                    <animate attributeName="cx" values="380;200" dur="1.5s" repeatCount="indefinite" begin="3.5s" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" begin="3.5s" />
                  </circle>

                  <circle className="pulse-dot p3" cx="540" cy="338" r="4">
                    <animate attributeName="cx" values="520;700" dur="1.5s" repeatCount="indefinite" begin="3.8s" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" begin="3.8s" />
                  </circle>

                  <circle className="pulse-dot p4" cx="450" cy="430" r="4">
                    <animate attributeName="cy" values="408;458" dur="1.5s" repeatCount="indefinite" begin="4.1s" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" begin="4.1s" />
                  </circle>
                </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
