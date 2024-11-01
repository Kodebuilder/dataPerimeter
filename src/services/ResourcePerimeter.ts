import { 
  SecurityLakeClient, 
  GetDataLakeExceptionsCommand,
  UpdateDataLakeExceptionsCommand 
} from "@aws-sdk/client-security-lake";

export class ResourcePerimeter {
  private securityLakeClient: SecurityLakeClient;

  constructor(region: string) {
    this.securityLakeClient = new SecurityLakeClient({ region });
  }

  async enforceResourceBoundaries(resourceArn: string): Promise<void> {
    try {
      // Get current exceptions
      const getCommand = new GetDataLakeExceptionsCommand({
        ResourceArn: resourceArn
      });
      
      const exceptions = await this.securityLakeClient.send(getCommand);

      // Update resource access patterns
      const updateCommand = new UpdateDataLakeExceptionsCommand({
        ResourceArn: resourceArn,
        ExceptionPatterns: [
          {
            Pattern: "arn:aws:s3:::security-data/*",
            AllowedOperations: ["READ", "WRITE"]
          }
        ]
      });

      await this.securityLakeClient.send(updateCommand);
    } catch (error) {
      console.error('Error enforcing resource boundaries:', error);
      throw error;
    }
  }

  async validateResourceCompliance(resourceArn: string): Promise<boolean> {
    try {
      const command = new GetDataLakeExceptionsCommand({
        ResourceArn: resourceArn
      });
      
      const response = await this.securityLakeClient.send(command);
      
      // Validate compliance rules
      return this.validateComplianceRules(response.Exceptions || []);
    } catch (error) {
      console.error('Error validating resource compliance:', error);
      return false;
    }
  }

  private validateComplianceRules(exceptions: any[]): boolean {
    // Implement compliance validation logic
    return exceptions.every(exception => 
      exception.AllowedOperations?.length <= 2 && 
      !exception.Pattern?.includes("*")
    );
  }
}