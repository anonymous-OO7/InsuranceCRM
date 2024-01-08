import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {axiosrequest} from '../../assets/utils/handler';
import TopBack from '../../components/molecules/TopBack';
import Markdown from 'react-native-markdown-display';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;

const PolicySummary = props => {
  const [policy, setPolicy] = useState(null);
  const [markdown, setMarkdown] = useState('');

  const string = 'Hi~\nthis is a test message.';

  const copy = `# h1 Heading 8

**This is some bold text!**

This is normal text

### Qualitative Information: *Policy Name:* LICs Bima Jyoti *UIN:*
512N339V02 #### 1. Policy Components: - *Change of Address:* The
insured must notify the branch office of any change in residence to
keep records updated. - *Assignment:* The policy allows assignment,
which means the policyholder can transfer the benefits to someone
else following the provisions of Section 38 of the Insurance Act,
1938. - *Nomination:* You can appoint a nominee(s) for the policy
benefits, as per the provisions of Section 39 of the Insurance Act,
1938. - *Intimation of Death:* Within 90 days from the death of the
insured, written intimation and the death certificate must be
submitted to claim the admissible benefits. #### 2. Provisions and
Exclusions: - *Section 45 of Insurance Act, 1938:* This section
provides the provisions related to contesting the term of the
insurance based on disclosures made in the proposal. - *Suicide
Clause:* If the life assured commits suicide within one year of
commencement of risk or revival of the policy, specific conditions
apply as to whether and how much will be paid out. - *Waiting
Period:* When a policy is obtained through certain channels like
POSP-LI or CPSC-SPV, there's a 90-day waiting period where certain
conditions apply for the payment of benefits in case of the
policyholders death. #### 3. Policy Access and Information: -
*Online Accessibility:* LICs e-services are available and
recommended for policyholders to use for better service. -
*Documentation:* The policy schedule provides essential details such
as policy number, premium payment terms, sum assured, and details of
the nominee, among others. #### 4. Maturity, Death, and Rider
Benefits: - *Death Benefit:* In case of death during the term, the
sum assured along with accrued guaranteed additions will be paid.
There are specific norms for payment depending on whether the death
occurs before or after the risk commencement date. - *Maturity
Benefit:* Upon surviving the policy term, the insured receives the
sum assured and guaranteed additions. - *Rider Benefits:* There are
options to add riders like accidental death, disability benefit,
term assurance, critical illness, etc., but these usually come at an
extra cost. #### 5. Payments and Surrender: - *Premium Payments:*
Policyholders must pay premiums when due, with applicable taxes. -
*Surrender:* The policy can be surrendered after two full years'
premiums have been paid, with conditions for surrender value. -
*Loans:* Loans can be availed against the policy, provided certain
conditions are met. ### Quantitative Information: *Policy Term:* Can
range from 15 to 20 years *Premium Paying Term:* Matching policy
term *Minimum Sum Assured:* Not specified in the provided excerpt is
defined when taking the policy. *Guaranteed Additions:* Rs. 50 per
thousand Basic Sum Assured per policy year. *Loan Interest Rate:*
Determined by LIC and may change based on the half-yearly
compounding rate. #### Guaranteed Surrender Value Factors: Based on
the policy term and year of surrender, there are specific
percentages of your paid premium that you are guaranteed to get back
if you surrender the policy. These are detailed in a table format in
the policy documents and vary depending on which year of the policy
term you are in when you surrender. #### Considerations Before
Buying: - Assess if the premium is within your budget. - Determine
if the sum assured matches your insurance needs. - Take into account
the policy and premium term suit your financial goals and insurance
coverage period. - Understand the process and implications of
assigning and nominating beneficiaries for the policy. - Review the
terms related to the claim settlement, especially the provisions of
Sections 38, 39, and 45 of the Insurance Act, which cover
assignment, nomination, and contestability respectively. - Evaluate
additional rider options based on personal needs and affordability
since they come at extra costs. - Examine the free look period
wherein you can review and return the policy if not satisfied with
the terms. The above qualitative and quantitative information should
be evaluated before purchasing LIC's Bima Jyoti to ensure it aligns
with your insurance objectives and requirements.
`;

const markdownStyles = {
  text: {
    color: 'black', // Set text color to black
  },
  // You can add styles for other markdown elements as needed
};


  useEffect(() => {
    getsummary();
  }, []);

  console.log(props.route.params, 'PARAMSS');

  const getsummary = async () => {
    console.log('GET ALL POLICY SUMMARY TEXT');
    try {
      // Block of code to try
      let endpoint = `/policy-summary/${props.route.params.data.id}`;
      const res = await axiosrequest('get', {}, endpoint);

      console.log('Response got get all  summaryy --> ', res.data);

      if (res != '' && res.status == 200) {
        const apiResponse = res.data;
        const policy = apiResponse.data.length > 0 ? apiResponse.data[0] : null;
        if (apiResponse.data.length > 0) {
          setPolicy(apiResponse.data[0]);
        } else {
          setPolicy(null);
        }

        // showToast(res?.data?.message);
      } else {
        // showToast(res?.data?.message);
      }
    } catch (err) {
      // Block of code to handle errors

      console.log(err, 'catch block of api');
    }
  };

  return (
    <View style={styles.container}>
      <TopBack props={props} heading={props.route.params.data.name} />

      <View style={styles.innerCtn}>
        <Text style={styles.headingTxt}>Policy summary</Text>

        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10 , height:responsiveHeight(85)}}>
          <Text style={styles.headingTxt}>
            {policy?.policy_name}
          </Text>
          

            <View style={{padding: 10}}>
            <Markdown style={markdownStyles}>
                {/* {copy} */}
                {policy?.summary1}
              </Markdown>
            </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: windowWidth,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  innerCtn: {
    // flex: 1,
    // marginLeft:responsiveWidth(8),
    backgroundColor: 'white',
    width: responsiveWidth(92),
  },
  headingTxt: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    width: windowWidth,
    backgroundColor: 'white',
  },
});

export default PolicySummary;
