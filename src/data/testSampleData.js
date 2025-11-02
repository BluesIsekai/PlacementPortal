// Test script to verify the sample profiles dataset
import { placementProfiles, getDatasetStats, searchProfiles, filterProfilesByRole } from './sampleProfiles.js';

console.log('=== PLACEMENT PORTAL SAMPLE DATASET TEST ===\n');

// Dataset overview
const stats = getDatasetStats();
console.log('📊 Dataset Statistics:');
console.log(`Total Profiles: ${stats.totalProfiles}`);
console.log(`Students: ${stats.students}`);
console.log(`Guiders: ${stats.guiders}`);
console.log(`Departments: ${stats.departments}`);
console.log(`Colleges: ${stats.colleges}`);
console.log(`Cities: ${stats.cities}`);
console.log(`Unique Skills: ${stats.uniqueSkills}`);
console.log(`Average Student CGPA: ${stats.averageCGPA.toFixed(2)}\n`);

// Department breakdown
console.log('🏫 Department Breakdown:');
stats.departmentBreakdown.forEach(dept => {
  console.log(`  ${dept.department}: ${dept.count} profiles`);
});
console.log();

// Sample searches
console.log('🔍 Sample Search Tests:');

console.log('1. Search for "Machine Learning":');
const mlResults = searchProfiles(placementProfiles, 'Machine Learning');
mlResults.forEach(profile => {
  console.log(`   - ${profile.name} (${profile.role}) from ${profile.college}`);
});
console.log();

console.log('2. Search for "IIT":');
const iitResults = searchProfiles(placementProfiles, 'IIT');
iitResults.forEach(profile => {
  console.log(`   - ${profile.name} (${profile.role}) from ${profile.college}`);
});
console.log();

console.log('3. Filter by Role - Students:');
const students = filterProfilesByRole(placementProfiles, 'Student');
console.log(`   Found ${students.length} students:`);
students.slice(0, 3).forEach(student => {
  console.log(`   - ${student.name} (${student.department}) - CGPA: ${student.cgpa}`);
});
console.log();

console.log('4. Filter by Role - Guiders:');
const guiders = filterProfilesByRole(placementProfiles, 'Guider');
console.log(`   Found ${guiders.length} guiders:`);
guiders.slice(0, 3).forEach(guider => {
  console.log(`   - ${guider.name} (${guider.company || guider.college}) - ${guider.experience}`);
});
console.log();

// Skills analysis
const allSkills = [...new Set(placementProfiles.flatMap(p => p.skills))];
const topSkills = allSkills.slice(0, 10);
console.log('💼 Top Skills in Dataset:');
topSkills.forEach(skill => {
  const count = placementProfiles.filter(p => p.skills.includes(skill)).length;
  console.log(`   - ${skill}: ${count} profiles`);
});
console.log();

// College analysis
const colleges = [...new Set(placementProfiles.map(p => p.college))];
console.log('🎓 Colleges Represented:');
colleges.forEach(college => {
  const count = placementProfiles.filter(p => p.college === college).length;
  console.log(`   - ${college}: ${count} profiles`);
});

console.log('\n✅ Dataset test completed successfully!');
console.log('📝 Ready for testing search and filter functionality in the Placement Portal.');

export { placementProfiles, getDatasetStats };
