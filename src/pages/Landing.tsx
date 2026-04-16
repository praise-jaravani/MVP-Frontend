import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Database, FileCheck, TrendingUp, Users, Building, CheckCircle, Play, ArrowRight, Eye, Lock, Brain, AlertTriangle } from 'lucide-react';

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax offsets for different layers
  // Background moves slower than foreground for traditional parallax depth
  const parallaxBg = scrollY * 0.7;
  const parallaxMid = scrollY * 0.4;
  const parallaxFg = scrollY * 0.1;

  return (
    <div className="min-h-screen bg-navy-900 relative overflow-hidden">
      {/* Aurora Gradient Background with Glow Ripple Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base Gradient - Dark blue to lighter navy */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-navy-800 to-navy-900"
        />

        {/* Parallax Container */}
        <div className="absolute inset-0" style={{ transform: `translateY(${parallaxBg}px)` }}>
          {/* Flowing Glow Wave / Energy Ripple */}
          <div className="absolute top-0 bottom-0 left-0 w-full md:w-3/4 -ml-[50%] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-[80px] animate-glow-wave" />

          {/* Animated Aurora Layer 1 - Deep Blue/Purple */}
          <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-600/30 via-blue-600/20 to-transparent rounded-full blur-3xl animate-aurora-1" />

          {/* Animated Aurora Layer 2 - Blue to Cyan */}
          <div className="absolute top-1/4 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-shield-blue/30 via-cyan-500/20 to-transparent rounded-full blur-3xl animate-aurora-2" />

          {/* Animated Aurora Layer 3 - Subtle Accent */}
          <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-t from-cyan-400/10 via-blue-900/40 to-transparent rounded-full blur-3xl animate-aurora-3" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0" style={{ transform: `translateY(${parallaxMid}px)` }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Sticky Navigation */}
        <nav className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="ShieldAI Logo" className="h-12 w-auto object-contain" />
            </div>
            <div className="flex items-center gap-4">
              <Link to="/signin">
                <button className="px-6 py-2 text-white/80 hover:text-white transition-colors font-medium">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-6 py-2.5 bg-gradient-to-r from-shield-blue to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-shield-blue/30 transition-all font-semibold">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Section 1: Hero - "Calm Power" */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 pt-20 pb-32">
          <div
            className="max-w-5xl mx-auto text-center"
            style={{ transform: `translateY(${parallaxFg}px)` }}
          >
            {/* Hero Text with Staggered Fade */}
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 leading-tight animate-fade-in">
              Cyber protection built for <span className="text-gradient">South Africa</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              AI-native endpoint security that stays online.
            </p>
            <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Built for South African businesses. Works perfectly during load-shedding. Trained on local threat intelligence.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Link to="/signup">
                <button className="group px-10 py-5 bg-white text-navy-900 text-lg font-semibold rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-3">
                  Start 14-Day Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="group px-10 py-5 bg-white/5 backdrop-blur text-white text-lg font-semibold rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-3">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-20 animate-float">
              <div className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto flex items-start justify-center p-1.5">
                <div className="w-1.5 h-3 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Problem - Load Shedding Reality */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32 relative">
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/50 to-transparent"
            style={{ transform: `translateY(${parallaxMid * 0.5}px)` }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Problem Statement */}
              <div className="space-y-6" style={{ opacity: Math.min(1, (scrollY - 400) / 300) }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium">
                  <AlertTriangle className="w-4 h-4" />
                  Stage 6 Load Shedding Active
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight">
                  Cloud security fails when the power doesn't.
                </h2>
                <p className="text-xl text-white/60 leading-relaxed">
                  Global EDR platforms rely on constant cloud connectivity. In South Africa, that's a liability.
                  When load-shedding hits, your business loses protection exactly when attackers strike.
                </p>
                <div className="pt-4 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2.5" />
                    <div>
                      <p className="text-white font-semibold">8-hour protection gaps during Stage 6</p>
                      <p className="text-white/50 text-sm">Cloud EDR loses connection, leaving endpoints vulnerable</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2.5" />
                    <div>
                      <p className="text-white font-semibold">62% of SA breaches during power outages</p>
                      <p className="text-white/50 text-sm">Attackers know when to strike</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Visual Representation */}
              <div className="relative" style={{ transform: `translateY(${parallaxFg * -0.5}px)` }}>
                <div className="aspect-square bg-gradient-to-br from-red-500/10 via-navy-700/50 to-transparent rounded-3xl border border-red-500/20 p-12 backdrop-blur-xl">
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="w-32 h-32 mx-auto bg-red-500/20 rounded-full border-4 border-red-500/40 flex items-center justify-center animate-pulse">
                        <Zap className="w-16 h-16 text-red-400" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-white/40 text-sm uppercase tracking-wider">Traditional Cloud EDR</p>
                        <p className="text-red-400 text-2xl font-bold">Offline</p>
                        <p className="text-white/30 text-xs">No Protection Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Differentiator - Edge AI */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Edge AI Visualization */}
              <div className="relative" style={{ transform: `translateY(${parallaxFg * -0.5 + 48}px)`, opacity: Math.min(1, (scrollY - 1200) / 400) }}>
                <div className="aspect-square bg-gradient-to-br from-shield-blue/10 via-navy-700/50 to-transparent rounded-3xl border border-shield-blue/20 p-12 backdrop-blur-xl">
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 blur-3xl animate-pulse-slow" />
                        <div className="w-32 h-32 mx-auto bg-green-500/20 rounded-full border-4 border-green-500/40 flex items-center justify-center relative z-10">
                          <Brain className="w-16 h-16 text-green-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white/40 text-sm uppercase tracking-wider">ShieldAI Edge Agent</p>
                        <p className="text-green-400 text-2xl font-bold">Always Protected</p>
                        <p className="text-white/60 text-sm">AI runs locally on your devices</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Explanation */}
              <div className="space-y-6" style={{ opacity: Math.min(1, (scrollY - 1300) / 300) }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  Edge AI Technology
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight">
                  Protection that never sleeps.
                </h2>
                <p className="text-xl text-white/60 leading-relaxed">
                  Our AI runs directly on your endpoints. No cloud required. No internet needed.
                  Real-time threat detection and blocking, even during Stage 6 load-shedding.
                </p>
                <div className="pt-4 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-shield-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5 text-shield-blue" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Local AI Models</p>
                      <p className="text-white/50 text-sm">Trained on 50,000+ African threat signatures</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-shield-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-shield-blue" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">&lt;1 Second Detection</p>
                      <p className="text-white/50 text-sm">No cloud latency, instant response</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-shield-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="w-5 h-5 text-shield-blue" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">100% Offline Capable</p>
                      <p className="text-white/50 text-sm">Protects during power outages and network failures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Local AI Intelligence */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32 relative">
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-shield-blue/5 to-transparent"
            style={{ transform: `translateY(${parallaxBg * 0.2}px)` }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16" style={{ opacity: Math.min(1, (scrollY - 1800) / 300) }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-blue/10 border border-shield-blue/20 rounded-full text-shield-blue text-sm font-medium mb-6">
                <Database className="w-4 h-4" />
                AfricaCERT Intelligence
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Trained on threats<br />targeting <span className="text-gradient">South Africa</span>.
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Global threat databases miss attacks designed for SA businesses. We don't.
              </p>
            </div>

            {/* Threat Examples Grid */}
            <div className="grid md:grid-cols-4 gap-6" style={{ opacity: Math.min(1, (scrollY - 1900) / 300) }}>
              {[
                { name: 'ABSA Phishing', count: '2,847', color: 'red' },
                { name: 'FNB Spoofs', count: '1,923', color: 'amber' },
                { name: 'Eskom Ransomware', count: '1,456', color: 'orange' },
                { name: 'SARS Scams', count: '3,201', color: 'red' },
              ].map((threat, i) => (
                <div
                  key={threat.name}
                  className="bg-navy-700/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-shield-blue/30 transition-all group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-center space-y-3">
                    <div className={`w-12 h-12 mx-auto bg-${threat.color}-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <AlertTriangle className={`w-6 h-6 text-${threat.color}-400`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{threat.count}</p>
                      <p className="text-sm text-white/50">signatures detected</p>
                    </div>
                    <p className="text-white/80 font-medium">{threat.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/40 text-sm">
                Updated daily with intelligence from AfricaCERT, CSIRT.ZA, and SA Financial Services ISAC
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Real-time Protection */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Explanation */}
              <div className="space-y-6" style={{ opacity: Math.min(1, (scrollY - 2500) / 300) }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  Real-Time Protection
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight">
                  See threats as they happen.
                </h2>
                <p className="text-xl text-white/60 leading-relaxed">
                  Live threat feed shows attacks blocked across your organization in real-time.
                  Full visibility into what we're protecting you from.
                </p>
                <div className="space-y-3 pt-4">
                  {['Ransomware blocked on JHB-LAPTOP-042', 'Phishing email quarantined for user@company.co.za', 'Malicious PowerShell script terminated'].map((alert, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-navy-700/50 backdrop-blur-xl border border-green-500/20 rounded-lg"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <p className="text-white/80 text-sm">{alert}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Dashboard Preview */}
              <div className="relative" style={{ transform: `translateY(${parallaxFg * -0.3}px)`, opacity: Math.min(1, (scrollY - 2600) / 300) }}>
                <div className="aspect-video bg-gradient-to-br from-navy-700/80 via-navy-600/50 to-navy-700/80 rounded-2xl border border-white/10 p-6 backdrop-blur-xl shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-white/60 text-sm font-medium">Live Threat Feed</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <p className="text-green-400 text-xs">Live</p>
                      </div>
                    </div>
                    <div className="space-y-3 mt-4">
                      {[
                        { threat: 'Phishing URL Blocked', endpoint: 'JHB-WKS-001', time: 'Just now', color: 'bg-red-400' },
                        { threat: 'Malicious Macro Blocked', endpoint: 'CPT-FIN-012', time: '2m ago', color: 'bg-amber-400' },
                        { threat: 'Unauthorized PowerShell', endpoint: 'DBN-WKS-042', time: '5m ago', color: 'bg-red-400' },
                        { threat: 'Ransomware Payload Prevented', endpoint: 'JHB-SRV-003', time: '12m ago', color: 'bg-red-400' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-navy-800/50 rounded-lg border border-white/5 animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse`} />
                            <div>
                              <p className="text-white text-sm font-medium">{item.threat}</p>
                              <p className="text-white/40 text-xs">{item.endpoint}</p>
                            </div>
                          </div>
                          <span className="text-white/40 text-xs">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Proof - Trial Mode */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32 relative">
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"
            style={{ transform: `translateY(${parallaxMid * 0.3}px)` }}
          />
          <div className="max-w-5xl mx-auto text-center relative z-10" style={{ opacity: Math.min(1, (scrollY - 3200) / 300) }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-8">
              <CheckCircle className="w-4 h-4" />
              14-Day Free Trial
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              See what you've been missing.
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto">
              Run ShieldAI alongside your current antivirus. We'll show you exactly what threats they're missing.
            </p>

            {/* Trial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { value: '47', label: 'Avg. threats detected', sublabel: 'in 14-day trial' },
                { value: '31', label: 'Missed by current AV', sublabel: 'would have been breaches' },
                { value: 'R127K', label: 'Avg. damage avoided', sublabel: 'per trial company' },
              ].map((stat, i) => (
                <div key={i} className="bg-navy-700/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <p className="text-5xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-white/80 font-medium mb-1">{stat.label}</p>
                  <p className="text-white/40 text-sm">{stat.sublabel}</p>
                </div>
              ))}
            </div>

            <Link to="/signup">
              <button className="group px-12 py-6 bg-gradient-to-r from-shield-blue to-blue-600 text-white text-xl font-semibold rounded-full hover:shadow-2xl hover:shadow-shield-blue/30 transition-all inline-flex items-center gap-3">
                Start Your Free Trial
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
            <p className="text-white/40 text-sm mt-6">No credit card required • Full features • Cancel anytime</p>
          </div>
        </section>

        {/* Section 7: Simple Pricing */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16" style={{ opacity: Math.min(1, (scrollY - 3800) / 300) }}>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Simple, transparent pricing.
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                15% below SentinelOne's entry-tier pricing. Built for South African businesses.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8" style={{ opacity: Math.min(1, (scrollY - 3900) / 300) }}>
              {/* Starter */}
              <div className="bg-navy-700/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-shield-blue/30 transition-all">
                <Building className="w-12 h-12 text-shield-blue mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">R2,125</span>
                  <span className="text-white/50">/endpoint/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Up to 50 endpoints', 'Windows agent', 'AfricaCERT intelligence', 'Email alerts', '30-day trial'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <button className="w-full py-4 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 transition-all font-semibold">
                    Start Free Trial
                  </button>
                </Link>
              </div>

              {/* Growth - Featured */}
              <div className="bg-gradient-to-br from-shield-blue/20 via-navy-700/50 to-navy-700/50 backdrop-blur-xl border-2 border-shield-blue rounded-3xl p-8 relative scale-105 shadow-2xl shadow-shield-blue/20">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-shield-blue to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <Users className="w-12 h-12 text-shield-blue mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">R2,500</span>
                  <span className="text-white/50">/endpoint/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Up to 200 endpoints', 'Windows + macOS + Linux', 'AfricaCERT + CSIRT.ZA intelligence', 'Smart alerts + playbooks', 'POPIA compliance'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <button className="w-full py-4 bg-white text-navy-900 rounded-full hover:shadow-lg transition-all font-semibold">
                    Start Free Trial
                  </button>
                </Link>
              </div>

              {/* Enterprise */}
              <div className="bg-navy-700/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-shield-blue/30 transition-all">
                <Shield className="w-12 h-12 text-shield-blue mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">Custom</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Unlimited endpoints', 'MSP portal access', 'Advanced forensics', 'Dedicated account manager', 'SLA guarantee'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 transition-all font-semibold">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="ShieldAI Logo" className="h-12 w-auto object-contain" />
              </div>
              <p className="text-white/40 text-sm text-center md:text-right">
                © 2026 ShieldAI. Protecting South African businesses with African threat intelligence.
                <br />
                <span className="text-white/30">Built for South Africa 🇿🇦</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
