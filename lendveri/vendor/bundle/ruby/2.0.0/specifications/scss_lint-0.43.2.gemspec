# -*- encoding: utf-8 -*-
# stub: scss_lint 0.43.2 ruby lib

Gem::Specification.new do |s|
  s.name = "scss_lint"
  s.version = "0.43.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Brigade Engineering", "Shane da Silva"]
  s.date = "2015-12-01"
  s.description = "Configurable tool for writing clean and consistent SCSS"
  s.email = ["eng@brigade.com", "shane.dasilva@brigade.com"]
  s.executables = ["scss-lint"]
  s.files = ["bin/scss-lint"]
  s.homepage = "https://github.com/brigade/scss-lint"
  s.licenses = ["MIT"]
  s.require_paths = ["lib"]
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.3")
  s.rubygems_version = "2.1.9"
  s.summary = "SCSS lint tool"

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rainbow>, ["~> 2.0"])
      s.add_runtime_dependency(%q<sass>, ["~> 3.4.15"])
      s.add_development_dependency(%q<rspec>, ["~> 3.3.0"])
    else
      s.add_dependency(%q<rainbow>, ["~> 2.0"])
      s.add_dependency(%q<sass>, ["~> 3.4.15"])
      s.add_dependency(%q<rspec>, ["~> 3.3.0"])
    end
  else
    s.add_dependency(%q<rainbow>, ["~> 2.0"])
    s.add_dependency(%q<sass>, ["~> 3.4.15"])
    s.add_dependency(%q<rspec>, ["~> 3.3.0"])
  end
end
